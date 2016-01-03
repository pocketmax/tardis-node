var Tardis = require('../app/app');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var prevId = null;

app.post('/eventblocks', function (req, res) {
	if(req.body.length){
		for(var i = 0; i< req.body.length; i++ ){
			var delta = req.body[i];

			Tardis.writer(delta, prevId, function(eventId, eventBlock){
				console.log('--------');
				prevId = eventId;
				res.json({
					data: {
						eventId: eventId,
						prevEventId: prevId,
						eventBlock: eventBlock
					},
					success: true
				});
			});
		}

	} else {
		var delta = req.body;
		Tardis.writer(delta, prevId, function(eventId, eventBlock){
			console.log('--------');
			prevId = eventId;
			res.json({
				data: {
					eventId: eventId,
					prevEventId: prevId,
					eventBlock: eventBlock
				},
				success: true
			});
		});
	}

})
.listen(3000, function () {
	var host = this.address().address;
	var port = this.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
