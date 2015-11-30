var uuid = require("uuid");

module.exports = function(deployCb, assemblyCb){

	var eventDataStack = [];
	var previousEventId = 'previousasdfasf';

	// create event block
	var createEventBlock = function(){

		// no pending events to turn into event blocks
		if(!eventDataStack.length){
			return false;
		}

		// take an event off the bottom of the event stack
		var event = eventDataStack.pop();

		// generate event ID
		var eventId = uuid.v4();

		// use previousEventId
		// event block created

		var eventBlock = {
			payload: event.eventData
		},
		eventName = event.eventName,
		eventData = event.eventData;

		// build event block using assembly callback
		var eventBlock = assemblyCb(eventId, previousEventId, eventName, eventData);

		// run deploy callback with event data
		deployCb(eventBlock, eventId, previousEventId, eventName, eventData);

		// change the previous event ID
		previousEventId = eventId;

	};

	// turn event data into an event block
	this.addEvent = function(eventName, eventData) {

		// add new event to top of stack
		eventDataStack.unshift({
			eventName: eventName,
			eventData: eventData
		});

		createEventBlock();
	};


};