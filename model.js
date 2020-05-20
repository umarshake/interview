let mysql = require('mysql');
let crypto = require('crypto');
let emailService = require('./email.service');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "voucher_manager"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


let model = {


	encryptPin : function(text){


		var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
		var mystr = mykey.update(text, 'utf8', 'hex')
		mystr += mykey.final('hex');


		return mystr;

	},

	decryptPin :  function(encryptPin){

		var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
		var mystr = mykey.update(encryptPin, 'hex', 'utf8')
		mystr += mykey.final('utf8');


		return mystr;

	},

	generateVoucher: function(email,pin,code,amount,returnCallback){

		let encryptPin = this.encryptPin(pin);
		// console.log(this.decryptPin(encryptPin));


		var sql = `INSERT INTO vouchers (email, code,pin,amount) VALUES ('${email}', '${code}' , '${encryptPin}' , '${amount}')`;
	  	
	  	con.query(sql, function (err, result) {
	    	if (err) throw err;

	    	const config = {

		 	email,
		 	pin,
		 	code,
		 	amount,
		 	subject : 'Voucher'
		}

		emailService.send(config,function(){

	    	returnCallback("voucher generated");

		});


	  	});


		
	},

	checkExpiredVoucher : function(code,pin){

		 var sql = `select created_at from vouchers where  code = '${code}' and pin = '${pin}' )`;

		 con.query(sql,function(err,result){

		 	if(err) throw err;

		 	let now = new Date();

		 });

	},


	redeemVoucher : function(body,returnCallback){

		let {email,code,pin,amount} = body;
		pin = this.encryptPin(pin);


		var sql = `select * from vouchers where email = '${email}' and code = '${code}' and pin = '${pin}' limit 1`;
		
		con.query(sql,function(err,result,fields){

			if(err) 
				throw err;

			if(!result.length){
				return returnCallback('Not a valid voucher credentials');
			}

			let row = result[0];
			if(row.status != 'active'){
				return returnCallback('voucher expired');
			}
			if(row.counter >= 5){
				return returnCallback('voucher redeemed 5 times');
			}

			let now = new Date();
			let created_at = new Date(row.created_at);
			if ( (now-created_at)/(1000*60*60) >= 24){
				let sql = `update vouchers set status = 'expired' where id = ${row.id}`; 
				con.query(sql,function(err,result){

					if(err) throw err;

					return returnCallback('voucher expired');
				});
			}

			let sql = `select * from voucher_transactions where voucher_id = '${row.id}' order by created_at desc`;
			con.query(sql,function(err,result,fields){

				let flag = false;
				if (err)  throw err;

				if(!result.length){
					if(amount == row.amount)
						return returnCallback('Only partial redemption allowed');

					flag = true;
				}

				else{

					lastredemption = result[0].created_at;

					let now = new Date();
					let created_at = new Date(lastredemption);

					if ( (now-created_at)/(1000*60) < 10){
						return returnCallback('Voucher can be redeemed after 10 min of last redemption');
					}

					let totalRedeemed = result.reduce((acc,x) => (acc + x.redemption_amount),0.00);
					console.log(totalRedeemed);
					if(totalRedeemed >= row.amount)
						return returnCallback('Voucher redeemed fully');

					flag = true;
				}


				if(flag){
					let sql = `insert into voucher_transactions (voucher_id,redemption_amount) VALUES (${row.id},${amount})`;
					con.query(sql,function(err,result){
						if (err) throw err;

						let sql = `update vouchers set counter = ${row.counter + 1} where id = ${row.id}`; 
						con.query(sql,function(err,result){

							if(err) throw err;

							return returnCallback('Voucher redeemed');

						});
					});

				}


			});
		});
	
	},


	createFilterString : function(query){
		let sql = 'select * from vouchers ';
		
		where = ''
		let flag = false;

		if(typeof query.email !== 'undefined'){

				where += `email = '${query.email}' `;
				flag = true;
		}

		if(typeof query.status !== 'undefined'){
			if(flag)
				where += ` AND status = '${query.status}' `;

			else{
				where += ` status = '${query.status}' `;
				flag=true
			}
				
		}

		if(typeof query.generation_start_time !== 'undefined' && typeof query.generation_end_time !== 'undefined'){
			if(flag)
				where += ` AND created_at between '${query.generation_start_time}' AND '${query.generation_end_time}' `;

			else{
				where += ` created_at between  '${query.generation_start_time}' AND '${query.generation_end_time}' `;
				flag=true;
			}
		}

		if(typeof query.code !== undefined){

			if(flag)
				where += ` AND code = '${query.code}' `;

			else{
				where += ` code = '${query.code}' `;
				flag=true
			}

		}


		if(flag){
			return (sql = sql + 'WHERE ' + where);  
		}
		

		return sql;


	},
	filterVoucher : function(query,returnCallback){

		let sql ='';
		sql = this.createFilterString(query);
		con.query(sql,function(err,result){

			returnCallback(result);

		});


	}
}

module.exports = model;