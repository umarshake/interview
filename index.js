const express = require('express');
let mysql = require('mysql');
let routes = require('./routes');
var app = express();


// mysql connections
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


// routes
app.post('/login/',function(req,res){



});
app.use('/user',routes);


app.listen(4000,function(req,res){
	console.log("listening 4000");
});


