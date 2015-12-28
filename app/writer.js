var crypto = require('crypto');


module.exports = function(eventType, eventDelta, prevEventId, cb){

	var payload = new Buffer(JSON.stringify(eventDelta)).toString('base64');
	var eventId = crypto.createHash('md5').update(payload + prevEventId).digest('hex');
	var eventBlock = eventId + '.' + payload;

		cb(eventId, eventBlock);

};