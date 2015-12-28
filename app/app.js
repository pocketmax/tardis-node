var core = {};

//TODO:	cfg.maxCacheSize = 100000  figure out how to config from main app.js file

core.Store = require('./store');

var StoreBroker = require('./storebroker');
core.storeBroker = new StoreBroker();

// event reader related modules
// cursors use reader
core.reader = require('./reader');  // singleton
// cursors use stores
core.Cursor = require('./cursor');

// event writer related modules
core.writer = require('./writer');  // singleton. used by pop cb on queue module
core.Queue = require('./queue');      // for writer to stack event deltas


module.exports = core;