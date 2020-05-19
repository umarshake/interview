var nodemailer = require('nodemailer');
var fs   = require('fs');
var ejs  = require('ejs');
const emailPath = '/views/email/';

var transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
    user: 'umarkhan.provab@gmail.com',
    pass: 'provab@123'
  }
});



module.exports = {
    
    send : function(config,returnCallback){

    	console.log(config);
        const html = this.getHtml(config);

        // console.log("rendered html ===>\n",html);
        var mailOptions = {
            from: 'umarkhan.provab@gmail.com',
            to: config.email,
            subject: config.subject,
            html: html,
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);

            return returnCallback();
          }
        });

        // console.log("Mail options====>",__basedir);

    },

    getHtml : function(config){

        // return ejs.render( ('email/'+textFile) );
        let htmlString = `<!DOCTYPE html>
			<html lang="en">
			<head>
			    <meta charset="UTF-8">
			    <meta name="viewport" content="width=device-width, initial-scale=1.0">
			    <title>Voucher</title>
			</head>
			<body>
			    <h1> Hi you got a voucher worth Rs ${config.amount} </h1>
			    <p>use Voucher Code :- ${config.code} with Voucher Pin :- ${config.pin} 
			    	along with email to reedeem it.
			    </p>
			</body>
			</html>`;

        return htmlString;
    }
}