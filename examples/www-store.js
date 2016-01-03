var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());


// upload an eventblock
app.post('/eventblock/:id', function (req, res) {

	var eventId = req.params.id,
		prevEventId = req.body.prevEventId,
		isRootBlock = req.body.isRootBlock,
		eventBlock = req.body.eventBlock;

	res.json({
		data: {
			isRootBlock: isRootBlock,
			eventId: eventId,
			prevEventId: prevEventId,
			eventBlock: eventBlock
		},
		success: true
	});

})
// get an event block by prevEventID
.get('/eventblock/preveventid/:id', function (req, res) {

	var prevEventId = req.params.id;

	res.json({
		data: {
			eventId: 'fetched event ID',
			isRootBlock: isRootBlock
		},
		success: true
	});

})
// get an event block by eventID
.get('/eventblock/:id', function (req, res) {

	var eventId = req.params.id;

	res.json({
		data: {
			isRootBlock: isRootBlock
		},
		success: true
	});

})
// get all root nodes
.get('/eventblock/rootnodes', function (req, res) {

	var eventId = req.params.id;

	res.json({
		data: [{
			eventId: '123',
			isRootBlock: true,
			eventBlock: eventBlock
		}],
		success: true
	});

})
.listen(3001, function () {
	var host = this.address().address;
	var port = this.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
