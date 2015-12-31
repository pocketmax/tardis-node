var Tardis = require('../app/app');


var deltas = [{
	type: 'userMsg',
	foo: 'this is a test'
},{
	type: 'userMsg',
	foo: 'this is some stuff'
}, {
	type: 'userMsg',
	foo: 'what evs'
}, {
	type: 'userMsg',
	foo: 'asd asDasdasDAsd asdasdsasdsd'
}, {
	type: 'userMsg',
	foo: 'dfsdfwe fsd sdf sdfsdfsdfsd'
}];

var prevId = null;
for(var i = 0; i<deltas.length; i++ ){
	var delta = deltas[i];

	Tardis.writer(delta, prevId, function(eventId, eventBlock){
		console.log('--------');
		console.log('eventId: ' + eventId);
		console.log('prevEventId: ' + prevId);
		console.log('eventBlock: ' + eventBlock);
		prevId = eventId;

	});
}

// TODO: support writing index blocks
// TODO: support event templates (encoding)
