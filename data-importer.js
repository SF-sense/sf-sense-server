var soda = require('soda-js');
var Incident = require('./models/incident');

/**
	fetch data from data.sfgov.org/resource/tmnf-yvry.json
	called one time when making a new connection to the server,
	and should be called once a day to refresh data (the source is 
	refreshed every 24h)
**/
exports.importData = function() {
	var consumer = new soda.Consumer('data.sfgov.org');
	consumer.query().withDataset('tmnf-yvry').limit(10).getRows()
	.on('success', function(jsonRows) {
		for (var i = 0; i < jsonRows.length; i++) {
			var row = jsonRows[i];
			var incident = new Incident({
				id : i,
				time : row.time,
				category : row.category,
				district : row.pddistrict,
				address : row.address,
				decription : row.descript,
				day : row.dayofweek,
				resolution : row.resolution,
				date : row.date,
				longitude : row.x,
				latitude : row.y
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
}