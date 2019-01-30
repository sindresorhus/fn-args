'use strict';
const test = require('ava');
const m = require('.');

test('async function', t => {
	t.deepEqual(m(async function (foo, bar) {}), ['foo', 'bar']);
	t.deepEqual(m(async (foo, bar) => {}), ['foo', 'bar']);
	t.deepEqual(m(async foo => {}), ['foo']);

	t.deepEqual(m(async (
		trailing,
		comma,
	) => {}), ['trailing', 'comma']);

	t.deepEqual(m(async function /* something */may(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	){}), ['go', 'here']);

	t.deepEqual(m(async function () {}), []);
	t.deepEqual(m(async function(){console.log('hello')}), []);
});
