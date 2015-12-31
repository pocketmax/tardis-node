var crypto = require('crypto');


module.exports = function(eventDelta, prevEventId, cb){

	eventDelta.prevEventId = prevEventId;
	var payload = new Buffer(JSON.stringify(eventDelta)).toString('base64');
	var eventId = crypto.createHash('md5').update(payload + prevEventId).digest('hex');
	var eventBlock = eventId + '.' + payload;

	cb(eventId, eventBlock);

};