'use strict';
const test = require('ava');
const functionArguments = require('.');

test('async function', t => {
	t.deepEqual(functionArguments(async function (foo, bar) {}), ['foo', 'bar']);
	t.deepEqual(functionArguments(async (foo, bar) => {}), ['foo', 'bar']);
	t.deepEqual(functionArguments(async foo => {}), ['foo']);

	t.deepEqual(functionArguments(async (
		trailing,
		comma,
	) => {}), ['trailing', 'comma']);

	t.deepEqual(functionArguments(async function /* something */may(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	){}), ['go', 'here']);

	t.deepEqual(functionArguments(async function () {}), []);
	t.deepEqual(functionArguments(async function(){console.log('hello')}), []);
});
