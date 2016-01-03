var Tardis = require('../app/app');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var prevId = null;

var request = require('request');
var myStore = {
	addEventBlock: function(eId, peId, eb, cb){
		request({
			url: 'http://localhost:3001/eventblock/' + eId,
			method: 'POST',
			json: true,
			body: {
				eventId: eId,
				prevEventId: peId,
				eventBlock: eb
			}
		}, function(err, msg, resp){
			if(err){
				console.log('got error...');
				console.log(err);

			} else {
				console.log('got response...');
				console.log(resp);

			}

			cb(err, resp);

		});

	}
};

var deployBlock = function(delta, req, res){

	Tardis.writer(delta, prevId, function(eventId, eventBlock){

		var data = {
			eventId: eventId,
			eventBlock: eventBlock
		};

		if(prevId){
			data.prevEventId = prevId;
			data.isRootBlock = false;
		} else {
			data.isRootBlock = true;
		}

		console.log('------------------------');
		console.log('| event block created! |');
		console.log('------------------------');
		console.log('eventId: ' + eventId);
		console.log('eventBlock: ' + eventBlock);
		console.log('isRoot: ' + ((data.isRootBlock) ? 'yes':'no'));

		myStore.addEventBlock(eventId,prevId,eventBlock, function(err, results){

			console.log('------------------------');
			console.log('| event block uploaded! |');
			console.log('------------------------');

			if(err){
				console.log('got an error!');
				console.log(err);
				res.end();
				return false;
			}

			console.log('got a response!');
			console.log(results);

			res.json({
				data: data,
				success: true
			});

		});

		prevId = eventId;

	});

};


app.post('/eventblocks', function (req, res) {
	if(req.body.length){
		for(var i = 0; i< req.body.length; i++ ){
			deployBlock(req.body[i], prevId, req, res);
		}

	} else {
		deployBlock(req.body, req, res);
	}

})
.listen(3000, function () {
	var host = this.address().address;
	var port = this.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
