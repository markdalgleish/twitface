var twitface = require('../lib/twitface.js');

exports['twitface'] = {
	'no size specified': function(test) {
		test.expect(1);
		twitface.load('markdalgleish', function(err, url) {
			test.equal(url.indexOf('twimg') > 0, true);
			test.done();
		});
	},
	'size specified': function(test) {
		test.expect(1);
		twitface.load('markdalgleish', 'bigger', function(err, url) {
			test.equal(url.indexOf('twimg') > 0, true);
			test.done();
		});
	},
	'invalid size specified': function(test) {
		test.expect(1);
		twitface.load('markdalgleish', 'invalid_size', function(err, url) {
			test.equal(url.indexOf('twimg') > 0, true);
			test.done();
		});
	},
	'cache works correctly': function(test) {
		test.expect(1);

		twitface.load('markdalgleish', 'mini', function(err, url) {
			
			var startTime = new Date();
			twitface.load('markdalgleish', 'mini', function(err, url) {
				test.equal(new Date() - startTime < 50, true);
				test.done();
			});

		});
	},
	'set and get the cache expiry duration': function(test) {
		test.expect(1);

		var ORIGINAL_DURATION = twitface.getExpiryDuration(),
			DURATION = 123;

		twitface.setExpiryDuration(DURATION);
		test.equal(twitface.getExpiryDuration(), DURATION);

		twitface.setExpiryDuration(ORIGINAL_DURATION);

		test.done();
	}
};