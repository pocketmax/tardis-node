var AwsStore = function(cfg){

	// code to init the store goes here


	this.addEventBlock = function(eventId, prevEventId, eventBlock, cb){

	};

	// returns event block with a matching prevEventId
	this.getByPrevEventId = function(prevEventId, cb){

	};

	// returns event block with a matching eventId
	this.getByEventId = function(eventId, cb){

	};

	// returns many event blocks with a prevEventId of null
	this.getRootEventBlocks = function(cb){

	};

};

var myStore = new AwsStore({
	username: 'myusername',
	password: 'mypassword'
});


myStore.addEventBlock('eId','peId', 'eblock', function(err, results){

});

myStore.getByPrevEventId('peId', function(err, results){

});

myStore.getByEventId('eId', function(err, results){

});

myStore.getRootEventBlocks(function(err, results){

});
