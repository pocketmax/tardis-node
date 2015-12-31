var
	Tardis = require('../app/app'),
	Promise = require('promise');

var stack = [{
	eventId: '0328338674e322a79271949f8eed8294',
	prevEventId: null,
	eventBlock: '0328338674e322a79271949f8eed8294.eyJ0eXBlIjoidXNlck1zZyIsImZvbyI6InRoaXMgaXMgYSB0ZXN0IiwicHJldkV2ZW50SWQiOm51bGx9'
},{
	eventId: '3372f9b703da504e04694396cf4e55bd',
	prevEventId: '0328338674e322a79271949f8eed8294',
	eventBlock: '3372f9b703da504e04694396cf4e55bd.eyJ0eXBlIjoidXNlck1zZyIsImZvbyI6InRoaXMgaXMgc29tZSBzdHVmZiIsInByZXZFdmVudElkIjoiMDMyODMzODY3NGUzMjJhNzkyNzE5NDlmOGVlZDgyOTQifQ=='
},{
	eventId: 'd8b94e1038996aadf32881c5426e5659',
	prevEventId: '3372f9b703da504e04694396cf4e55bd',
	eventBlock: 'd8b94e1038996aadf32881c5426e5659.eyJ0eXBlIjoidXNlck1zZyIsImZvbyI6IndoYXQgZXZzIiwicHJldkV2ZW50SWQiOiIzMzcyZjliNzAzZGE1MDRlMDQ2OTQzOTZjZjRlNTViZCJ9'
},{
	eventId: '872e9188c4ef510c170d7696af207179',
	prevEventId: 'd8b94e1038996aadf32881c5426e5659',
	eventBlock: '872e9188c4ef510c170d7696af207179.eyJ0eXBlIjoidXNlck1zZyIsImZvbyI6ImFzZCBhc0Rhc2Rhc0RBc2QgYXNkYXNkc2FzZHNkIiwicHJldkV2ZW50SWQiOiJkOGI5NGUxMDM4OTk2YWFkZjMyODgxYzU0MjZlNTY1OSJ9'
},{
	eventId: 'b979e88c2033a9ad8ae908b12740b44c',
	prevEventId: '872e9188c4ef510c170d7696af207179',
	eventBlock: 'b979e88c2033a9ad8ae908b12740b44c.eyJ0eXBlIjoidXNlck1zZyIsImZvbyI6ImRmc2Rmd2UgZnNkIHNkZiBzZGZzZGZzZGZzZCIsInByZXZFdmVudElkIjoiODcyZTkxODhjNGVmNTEwYzE3MGQ3Njk2YWYyMDcxNzkifQ=='
}];


var fetchByPrevId = function(id, cb){
	console.log('fetchByPrevId(' + id + ')...');
	for(var i = 0; i<stack.length; i++){
		if(stack[i]['prevEventId'] === id){
			cb(stack[i].eventId, stack[i].eventBlock);
		}
	}
};

var promiseFactory = function(prevEventId){
	prevEventId = prevEventId || null;
	console.log('promiseFactory(' + prevEventId + ')...');

	return new Promise(function(reject, fulfill){

		fetchByPrevId(prevEventId, function(eventId, block){
			console.log("fetchByPrevId:cb('" + eventId + "','" + block + "')");
			fulfill({ eId: eventId, block: block });
		});

	});

};


var thenCb = function(result){
	console.log("thenCb('" + result + "')");
	console.log(result);

	Tardis.reader(result.eId, result.block, function(eventId, data){
		console.log("Tardis.reader:cb('" + data + "')...");
		console.log(data);
		console.log('=========================');
		promiseFactory(eventId)
			.then(null, thenCb);
	});

};


promiseFactory()
.then(null, thenCb);
