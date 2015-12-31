var crypto = require('crypto');



module.exports = function(eId, block, cb){

	var payload = block.split('.')[1];
	var data = JSON.parse(new Buffer(payload,'base64').toString());
	cb(eId, data);

};