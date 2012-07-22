# twitface

Twitter avatar API client for Node.js [![Build Status](https://secure.travis-ci.org/markdalgleish/twitface.png)](http://travis-ci.org/markdalgleish/twitface)

## Setup

Install the module with: `npm install https://github.com/markdalgleish/twitface/tarball/master`

## Basic Usage

```javascript
var twitface = require('twitface');

twitface.load('markdalgleish', function(err, url) {
	console.log(url); // Avatar URL (normal size)
});
```

## Request a specific size

```javascript
twitface.load('username', 'size', function(err, url) {
	console.log(url); // Avatar URL (normal size)
});
```

Twitter offers the following sizes:

* `original` (Original upload size)
* `mini` (24x24)
* `normal` (48x48)
* `bigger` (73x73)
* `reasonably_small` (128x128 - Don't ask me, ask Twitter…)

## Modify the default size

By default, 'normal' avatar URLs are returned. This default can be changed with `setDefaultSize`:

```javascript
twitface.setDefaultSize('reasonably_small');

twitface.load('username', function(err, url) {
	console.log(url); // Avatar URL (128x128)
});
```

## Modify the cache expiry duration

By default, avatar URLs are cached for 24 hours to limit the amount the API is hit.

You can modify how long URLs are cached with `setExpiryDuration`:

```javascript
twitface.setExpiryDuration(1000 * 60 * 60); // Cache for 60 minutes
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## License
Copyright (c) 2012 Mark Dalgleish  
Licensed under the MIT license.
