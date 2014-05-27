var schedule = require('node-schedule');
var data = require('./data-importer');

var rule = new schedule.RecurrenceRule();
rule.hour = 23;
rule.minute = 59;
// refresh data every 24h
exports.schedule = function() {
	console.log('starting scheduling');
	schedule.scheduleJob(rule, function(){data.importData();})
};
