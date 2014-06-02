var db = require('./config');
var express = require('express');
var handler = require('./lib/request-handler');
var logger = require('morgan');
var data = require('./data-importer');
var scheduler = require('./scheduler');

var app = express();

var auth = express.basicAuth(function(user, pass) {
	console.log(user + " : " + pass);
	return user === 'sf-sense' && pass === '858F8CDDB1F324A762DBEFDC77844';
});

app.configure(function(){
	app.use(logger());
	app.use(express.compress());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(function(req, res, next){
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
		res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
		res.setHeader("Access-Control-Allow-Credentials", "true");
		next();
	});
});

// refresh data when opening a new connection
data.importData();

app.get('/near', auth, handler.getNear);

scheduler.schedule();

module.exports = app;
