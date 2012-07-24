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

exports.load = function(name, size, callback) {
	var isArray = Array.isArray(name);
	var usernames = isArray ? name : [name];

	callback = typeof size === 'function' ? size : callback;
	size = typeof size === 'string' ? sizes[size] || sizes[defaultSize] : sizes[defaultSize];

	var invalidUsernames = usernames.filter(function(username){
		return !(/^[A-Za-z0-9_]+$/.test(username));
	});

	if (invalidUsernames.length > 0) {
		callback(new Error('Invalid username' + (invalidUsernames.length > 1 ? 's' : '')), null);
		return;
	}

	var promises = [];

	usernames.forEach(function(username) {
		var cachedPromise = cache.get(username, size);

		if (cachedPromise) {
			promises.push(cachedPromise);
		} else {
			var deferred = q.defer(),
				promise = deferred.promise;

			// Place promise in cache
			cache.set(username, size, promise);
			promises.push(promise);

			request('http://api.twitter.com/1/users/profile_image/' + username + '?size=' + size, function(err, response, body) {
				if (err) {
					deferred.reject(err);
					return;
				}

				// Resolve cached promise
				deferred.resolve(response.request.uri.href);
			});
		}
	});

	q.when(q.all(promises)).then(function(urls) {
		callback(null, isArray ? urls : urls[0]);
	}, function(err) {
		callback(err, null);
	});
};