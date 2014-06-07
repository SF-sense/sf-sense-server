var app = require('./server-config.js');

var port = Number(process.env.PORT || 1234);

app.listen(port, function() {
	console.log('Server now listening on port ' + port);	
});
