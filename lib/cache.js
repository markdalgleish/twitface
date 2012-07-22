var cache = {};
var cacheExpiryDuration = 1000 * 60 * 60 * 24; // 1 day

exports.setExpiryDuration = function(ms) {
	cacheExpiryDuration = ms;
};

exports.getExpiryDuration = function(ms) {
	return cacheExpiryDuration;
};

exports.set = function(username, size, url) {
	cache[username + '.' + size] = {
		date: new Date(),
		url: url
	};
};

exports.get = function(username, size) {
	var cacheEntry = cache[username + '.' + size];

	if (cacheEntry && new Date() - cacheEntry.date < cacheExpiryDuration) {
		return cacheEntry.url;
	} else {
		return null;
	}
};