'use strict';
var assert = require('assert');
var semver = require('semver');
var fnArgs = require('./');

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

it('should get the arguments of a generatorFunction', function () {
	assert.deepEqual(fnArgs(function* (foo, bar) {}), ['foo', 'bar']);

	assert.deepEqual(fnArgs(function* /* something */may(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	){}), ['go', 'here']);

	assert.deepEqual(fnArgs(function* () {}), []);
	assert.deepEqual(fnArgs(function*(){console.log('hello')}), []);
});

it('should throw if wrong type', function () {
	assert.throws(function () {
		fnArgs('');
	});
});

if (semver.gt(process.versions.node, '7.0.0')) {
	require('./test-async');
}
