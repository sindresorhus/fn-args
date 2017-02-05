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

it('arrow function', () => {
	assert.deepEqual(m((foo, bar) => {}), ['foo', 'bar']);
	assert.deepEqual(m(( foo ) => {}), ['foo']);
	assert.deepEqual(m(foo=>{}), ['foo']);

	assert.deepEqual(m(/* something */(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	)=>{}), ['go', 'here']);

	assert.deepEqual(m(() => {}), []);
	assert.deepEqual(m(()=>{console.log('hello')}), []);
});

it('throws if wrong type', () => {
	assert.throws(() => {
		m('');
	});
});

it('rest parameter', () => {
	assert.deepEqual(m((...args) => {}), ['...args']);
	assert.deepEqual(m((arg1, arg2,...args) => {}), ['arg1', 'arg2', '...args']);
});

it('removes default values', () => {
	assert.deepEqual(m((foo = 2, bar = false) => {}), ['foo', 'bar']);
	assert.deepEqual(m((foo = {
		key1 : [1, 2, 3],
		key2 : [4, 5, 6]
	}, bar = "(, , , )") => {}), ['foo', 'bar']);

	assert.deepEqual(m((foo = ")", bar) => {}), ['foo', 'bar']);
	assert.deepEqual(m((foo = `${"test"}`, bar={str:'?" " " ", , '}) => {}), ['foo', 'bar']);
	assert.deepEqual(m((foo = /\w\W\w/gi) => {}), ['foo']);
});

if (semver.gt(process.versions.node, '7.0.0')) {
	require('./test-async');
}
