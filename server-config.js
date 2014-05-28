var db = require('./config');
var express = require('express');
var util = require('./lib/utility');
var handler = require('./lib/request-handler');
var logger = require('morgan');
var data = require('./data-importer');
var scheduler = require('./scheduler');

var app = express();

app.configure(function(){
	app.use(logger());				// logging
	app.use(express.bodyParser()); 	// parse json data in body
	app.use(function(req, res, next){
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		next();
	});
});

// refresh data when opening a new connection
data.importData();

app.get('/near', handler.getNear);

scheduler.schedule();

module.exports = app;

/**

	res.set('access-control-allow-origin', '*');
	res.set('access-control-allow-methods', 'GET');
	res.set('access-control-allow-headers', 'origin, content-type, accept');


**/