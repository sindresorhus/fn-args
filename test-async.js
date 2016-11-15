'use strict';

var assert = require('assert');
var fnArgs = require('./');

it('should get the arguments of a async function', function () {
	assert.deepEqual(fnArgs(async function (foo, bar) {}), ['foo', 'bar']);

	assert.deepEqual(fnArgs(async function /* something */may(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	){}), ['go', 'here']);

	assert.deepEqual(fnArgs(async function () {}), []);
	assert.deepEqual(fnArgs(async function(){console.log('hello')}), []);
});
