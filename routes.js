const express = require('express');
const rand = require('randomstring');
const model = require('./model');
const bodyParser = require('body-parser');
const router = express.Router();


router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended: false}));

function validate(query) {
  if(typeof query.email !== 'undefined' && typeof query.amount !== 'undefined')
  	return true;

  return false;
}

function validateRequest(query){

	if(typeof query.email !== 'undefined' && typeof query.amount !== 'undefined' 
		&& typeof query.code !== 'undefined' && typeof query.pin !== 'undefined')
  	return true;

  return false;
}


router.get('/generate/voucher',function(req,res){



	let pin = rand.generate({

		length: 5,
  		charset: 'alphabetic'
	});
	let code = 'VCD' + rand.generate({

		length: 10,
  		charset: 'alphanumeric'
	});
	let email  = req.query.email;
	let amount = req.query.amount;

	if (! validate(req.query)) {
		res.json({error:'missing parameters'});
		return;
	}
	model.generateVoucher(email,pin,code,amount);
});

router.post('/redeem/voucher',function(req,res){


if (! validateRequest(req.body)) {
		res.json({error:'missing parameters'});
		return;
	}


	try{
	
	(model.redeemVoucher(req.body,function(msg){

		res.json(msg);

	}));


	}
	catch(err){

		res.json(err.message);
	}

});




module.exports = router;
