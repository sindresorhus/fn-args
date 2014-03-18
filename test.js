'use strict';
var assert = require('assert');
var fnArgs = require('./fn-args');

it('should get the arguments of a function', function () {
	assert.deepEqual(fnArgs(function (foo, bar) {}), ['foo', 'bar']);

	assert.deepEqual(fnArgs(function /* something */may(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	){}), ['go', 'here']);

	assert.deepEqual(fnArgs(function () {}), []);
	assert.deepEqual(fnArgs(function(){console.log('hello')}), []);
});

it('should throw if wrong type', function () {
	assert.throws(function () {
		fnArgs('');
	});
});
