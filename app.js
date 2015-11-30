var EventWriter = require('./writer/app');
var EventReader = require('./reader/app');

/*
 eb: eventBlock is the fully fleshed out event block
 eventID: the ID of the event block
 prevID: the ID of the previous event block
 distributes event to event stores
 */
var cb = function(eventBlock, eventID, prevID, eventName, eventData){

	// TODO: put the finished event block where ever it needs to be
	console.log(arguments);

};

// used to build the event block. returns the event block
var assemblyCb = function(eventID, prevID, eventName, eventData){


	var eventBlock = {};
	return eventBlock;

};

var writer = new EventWriter(cb, assemblyCb);


var reader = new EventReader(function(eventID, prevID, eventName, eventData){


	var eventBlock = {};
	return eventBlock;

});

var eventName = 'userLoggedIn';
var eventData = {
	foo: 'bar'
};

// add event to top of pending event stack
writer.addEvent(eventName, eventData);

// read an event block for a projection
reader.readEventBlock(eventBlock);