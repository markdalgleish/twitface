/*
 * twitface
 * https://github.com/markdalgleish/twitface
 *
 * Copyright (c) 2012 Mark Dalgleish
 * Licensed under the MIT license.
 */

var q = require('q'),
	request = require('request'),
	cache = require('./cache');

var defaultSize = 'normal';
var sizes = {
	'original': 'original',
	'mini': 'mini',
	'normal': 'normal',
	'bigger': 'bigger',
	'reasonably_small': 'reasonably_small' // Huh?
};

exports.setExpiryDuration = cache.setExpiryDuration;
exports.getExpiryDuration = cache.getExpiryDuration;

exports.setDefaultSize = function(size) {
	if (sizes[defaultSize]) {
		defaultSize = size;
	}
};

exports.getDefaultSize = function(defaultSize) {
	return defaultSize;
};

exports.load = function(username, size, callback) {
	callback = typeof size === 'function' ? size : callback;
	size = typeof size === 'string' ? sizes[size] || sizes[defaultSize] : sizes[defaultSize];

	var cachedPromise = cache.get(username, size);

	if (cachedPromise) {
		// Fire callback when cached promise is resolved
		q.when(cachedPromise).then(function(cachedUrl) {
			callback(null, cachedUrl);
		}, function(err) {
			callback(err, null);
		});
	} else {
		var deferred = q.defer();

		// Place promise in cache
		cache.set(username, size, deferred.promise);

		request('http://api.twitter.com/1/users/profile_image/' + username + '?size=' + size, function(err, response, body) {
			if (err) {
				deferred.reject(err);
				callback(err, null);
				return;
			}

			var url = response.request.uri.href;

			// Resolve cached promise
			deferred.resolve(url);

			callback(err, url);
		});
	}
};