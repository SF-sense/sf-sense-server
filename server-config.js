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
});

// refresh data when opening a new connection
data.importData();

app.get('/near', handler.getNear);

scheduler.schedule();

module.exports = app;
