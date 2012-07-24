var twitface = require('../lib/twitface.js');

exports['twitface'] = {
	'a single url is returned when passed a single username': function(test) {
		test.expect(1);

		twitface.load('markdalgleish', function(err, url) {
			test.equal(url.indexOf('twimg') > 0, true);
			test.done();
		});
	},
	'an array of urls is returned when passed an array of usernames': function(test) {
		test.expect(2);

		twitface.load(['markdalgleish', 'ryah'], function(err, urls) {
			test.equal(urls[0].indexOf('twimg') > 0, true);
			test.equal(urls[1].indexOf('twimg') > 0, true);
			test.done();
		});
	},
	'an array with a single url is returned when passed an array containing a single username': function(test) {
		test.expect(3);

		twitface.load(['markdalgleish'], function(err, urls) {
			test.equal(urls.length, 1);
			test.equal(Array.isArray(urls), true);
			test.equal(urls[0].indexOf('twimg') > 0, true);
			test.done();
		});
	},
	'a url is returned when a username and size is supplied': function(test) {
		test.expect(1);

		twitface.load('markdalgleish', 'bigger', function(err, url) {
			test.equal(url.indexOf('twimg') > 0, true);
			test.done();
		});
	},
	'an array of urls is returned when passed an array of names and a size': function(test) {
		test.expect(2);

		twitface.load(['markdalgleish', 'ryah'], 'bigger', function(err, urls) {
			test.equal(urls[0].indexOf('twimg') > 0, true);
			test.equal(urls[1].indexOf('twimg') > 0, true);
			test.done();
		});
	},
	'a url is returned even if an invalid size is provided': function(test) {
		test.expect(1);

		twitface.load('markdalgleish', 'invalid_size', function(err, url) {
			test.equal(url.indexOf('twimg') > 0, true);
			test.done();
		});
	},
	'values can be set and retrieved from the cache': function(test) {
		test.expect(1);

		twitface.load('markdalgleish', 'mini', function(err, url) {
			
			var startTime = new Date();
			twitface.load('markdalgleish', 'mini', function(err, url) {
				test.equal(new Date() - startTime < 50, true);
				test.done();
			});

		});
	},
	'the cache expiry duration value can be set and retrieved': function(test) {
		test.expect(1);

		var ORIGINAL_DURATION = twitface.getExpiryDuration(),
			DURATION = 123;

		twitface.setExpiryDuration(DURATION);
		test.equal(twitface.getExpiryDuration(), DURATION);

		twitface.setExpiryDuration(ORIGINAL_DURATION);

		test.done();
	},
	'an error is thrown if an invalid username is provided': function(test) {
		test.expect(1);

		twitface.load('markdalgleish/foo', function(err, url) {
			test.equal(err.message, 'Invalid username');
			test.done();
		});
	},
	'an error is thrown if an array of invalid usernames is provided': function(test) {
		test.expect(1);

		twitface.load(['markdalgleish/foo', 'ryah/bar'], function(err, url) {
			test.equal(err.message, 'Invalid usernames');
			test.done();
		});
	}
};