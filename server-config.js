var db = require('./config');
var express = require('express');
var util = require('./lib/utility');
var handler = require('./lib/request-handler');
var logger = require('morgan');
var data = require('./data-importer');
var app = express();

app.configure(function(){
	app.use(logger());
	app.use(express.bodyParser()); // json body parser
});

// refresh the data when opening a new connection
data.importData();

app.get('/data', handler.getData);

module.exports = app;
