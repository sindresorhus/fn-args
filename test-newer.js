'use strict';
const test = require('ava');
const m = require('.');

test('async function', t => {
	t.deepEqual(m(async function (foo, bar) {}), ['foo', 'bar']);
	t.deepEqual(m(async (foo, bar) => {}), ['foo', 'bar']);
	t.deepEqual(m(async foo => {}), ['foo']);

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

test('rest parameters', t => {
	t.deepEqual(m((...args) => {}), ['...args']);
	t.deepEqual(m((arg1, arg2,...args) => {}), ['arg1', 'arg2', '...args']);
});

test('default parameters', t => {
	t.deepEqual(m((foo = 2, bar = false) => {}), ['foo', 'bar']);
	t.deepEqual(m((foo = {
		key1: [1, 2, 3],
		key2: [4, 5, 6]
	}, bar = '(, , , )') => {}), ['foo', 'bar']);

	t.deepEqual(m((foo = ')', bar) => {}), ['foo', 'bar']);
	t.deepEqual(m((foo = `${'test'}`, bar={str:'?" " " ", , '}) => {}), ['foo', 'bar']);
	t.deepEqual(m((foo = /\w\W\w/gi) => {}), ['foo']);
});
