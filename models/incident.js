var mongoose = require('mongoose');

var incidentSchema = mongoose.Schema({
	id: { type: String, required: true, index: { unique: true } },
	time: {type : String},
	category: {type : String},
	type : {type : String},
	district: {type : String},
	address: {type : String},
	descript: {type : String},
	day : {type : String},
	resolution : {type : String},
	date : {type : String},
	longitude : Number,
	latitude : Number,
});

var Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
