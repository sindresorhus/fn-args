'use strict';
/* eslint-env mocha */
const assert = require('assert');
const semver = require('semver');
const m = require('./');

it('function', () => {
	assert.deepEqual(m(function (foo, bar) {}), ['foo', 'bar']);

	assert.deepEqual(m(function /* something */may(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	){}), ['go', 'here']);

	assert.deepEqual(m(function () {}), []);
	assert.deepEqual(m(function(){console.log('hello')}), []);
});

it('generator function', () => {
	assert.deepEqual(m(function * (foo, bar) {}), ['foo', 'bar']);

	assert.deepEqual(m(function* /* something */may(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	){}), ['go', 'here']);

	assert.deepEqual(m(function* () {}), []);
	assert.deepEqual(m(function*(){console.log('hello')}), []);
});

it('throws if wrong type', () => {
	assert.throws(() => {
		m('');
	});
});

if (semver.gt(process.versions.node, '7.0.0')) {
	require('./test-async');
}
