var soda = require('soda-js');
var Incident = require('./models/incident');
var moment = require('moment');

cleanData = function() {
	console.log('cleaning data');
	Incident.find({}).remove().exec();
};

isAssault = function(category) {
	return category === "ASSAULT" || category === "KIDNAPPING" ||
		category === "SEX OFFENSES, FORCIBLE" || category === "ROBBERY";
};

isTheft = function(category) {
	return category === "LARCENY/THEFT" || category === "VEHICLE THEFT";
};

filterType = function(category, descript) {
	if (isAssault(category)){
		return "assault"
	} else if (isTheft(category)) {
		return "theft";
	}
	return "other";
};

customizeCategories = function(row) {
	if (isTheft(row.category) && row.descript.indexOf("BICYCLE")) {
		row.category = "BICYCLE THEFT";
	}
	if (isAssault(row.category) && (row.descript.indexOf("KNIFE") ||
		row.descript.indexOf("WEAPON") || row.descript.indexOf("GUN"))) {
		row.category = "ASSAULT WITH A DEADLY WEAPON";
	}
};

addDateAndTimeToDescription = function(row) {
	var d = new Date(row.date * 1000);
	d.setHours(parseInt(row.time.substring(0, 2)));
	d.setMinutes(parseInt(row.time.substring(3, 5)));
	var incidentTime = moment(d);
	var nowTime = moment(new Date());


	row.descript += '\n' + incidentTime.from(nowTime) + ' at ' + row.time;
} ;

/**
	fetch data from data.sfgov.org/resource/tmnf-yvry.json
	called one time when making a new connection to the server,
	and should be called once a day to refresh data (the source is 
	refreshed every 24h)
**/	
exports.importData = function() {
	cleanData();
	var consumer = new soda.Consumer('data.sfgov.org');
	consumer.query().withDataset('tmnf-yvry').getRows()
	.on('success', function(jsonRows) {
		console.log('importing data');
		for (var i = 0; i < jsonRows.length; i++) {
			var row = jsonRows[i];
			var type = filterType(row.category, row.descript);
			customizeCategories(row);
			addDateAndTimeToDescription(row);
			var incident = new Incident({
				id : i,
				time : row.time,
				category : row.category,
				type : type,
				district : row.pddistrict,
				address : row.address,
				day : row.dayofweek,
				resolution : row.resolution,
				date : row.date,
				descript : row.descript,
				longitude : parseFloat(row.x),
				latitude : parseFloat(row.y),
			});
			incident.save(function(err, incident) {
				if (err) {
					return err;
				}
			});
		}
	})
	.on('error', function(error) {
		console.error(error);
	});	
};

