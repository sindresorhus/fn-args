'use strict';
/* eslint-env mocha */
const assert = require('assert');
const m = require('./');

it('async function', () => {
	assert.deepEqual(m(async function (foo, bar) {}), ['foo', 'bar']);
	assert.deepEqual(m(async (foo, bar) => {}), ['foo', 'bar']);
	assert.deepEqual(m(async foo => {}), ['foo']);

	assert.deepEqual(m(async function /* something */may(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	){}), ['go', 'here']);

	assert.deepEqual(m(async function () {}), []);
	assert.deepEqual(m(async function(){console.log('hello')}), []);
});
