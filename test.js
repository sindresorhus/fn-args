import test from 'ava';
import semver from 'semver';
import m from '.';

test('function', t => {
	t.deepEqual(m(function (foo, bar) {}), ['foo', 'bar']);

	t.deepEqual(m(function /* something */may(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	){}), ['go', 'here']);

	t.deepEqual(m(function () {}), []);
	t.deepEqual(m(function(){console.log('hello')}), []);
});

test('generator function', t => {
	t.deepEqual(m(function * (foo, bar) {}), ['foo', 'bar']);

	t.deepEqual(m(function* /* something */may(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	){}), ['go', 'here']);

	t.deepEqual(m(function* () {}), []);
	t.deepEqual(m(function*(){console.log('hello')}), []);
});

test('arrow function', t => {
	t.deepEqual(m((foo, bar) => {}), ['foo', 'bar']);
	t.deepEqual(m(( foo ) => {}), ['foo']);
	t.deepEqual(m(foo=>{}), ['foo']);

	t.deepEqual(m(/* something */(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	)=>{}), ['go', 'here']);

	t.deepEqual(m(() => {}), []);
	t.deepEqual(m(()=>{console.log('hello')}), []);
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

test('throws if wrong type', t => {
	t.throws(() => {
		m('');
	});
});

if (semver.gt(process.versions.node, '7.0.0')) {
	require('./test-newer');
}
