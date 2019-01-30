'use strict';
const test = require('ava');
const fnArgs = require('.');

test('async function', t => {
	t.deepEqual(fnArgs(async function (foo, bar) {}), ['foo', 'bar']);
	t.deepEqual(fnArgs(async (foo, bar) => {}), ['foo', 'bar']);
	t.deepEqual(fnArgs(async foo => {}), ['foo']);

	t.deepEqual(fnArgs(async (
		trailing,
		comma,
	) => {}), ['trailing', 'comma']);

	t.deepEqual(fnArgs(async function /* something */may(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	){}), ['go', 'here']);

	t.deepEqual(fnArgs(async function () {}), []);
	t.deepEqual(fnArgs(async function(){console.log('hello')}), []);
});
