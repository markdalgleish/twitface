var cache = require('../lib/cache.js');

exports['cache'] = {
	'setting and getting a cache entry': function(test) {
		test.expect(1);

		var USERNAME = 'username',
			SIZE = 'large',
			URL = 'http://example.com/username/size';

		cache.set(USERNAME, SIZE, URL);
		test.equal(cache.get(USERNAME, SIZE), URL);
		test.done();
	},
	'cache entries can expire': function(test) {
		test.expect(1);

		var ORIGINAL_DURATION = cache.getExpiryDuration(),
			USERNAME = 'username',
			SIZE = 'large',
			URL = 'http://example.com/username/size';

		cache.setExpiryDuration(0);
		cache.set(USERNAME, SIZE, URL);
		
		test.equal(cache.get(USERNAME, SIZE), null);

		cache.setExpiryDuration(ORIGINAL_DURATION);
		test.done();
	}
};