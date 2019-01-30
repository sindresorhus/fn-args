import test from 'ava';
import semver from 'semver';
import fnArgs from '.';

test('function', t => {
	t.deepEqual(fnArgs(function (foo, bar) {}), ['foo', 'bar']);

	t.deepEqual(fnArgs(function /* something */may(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	){}), ['go', 'here']);

	t.deepEqual(fnArgs(function () {}), []);
	t.deepEqual(fnArgs(function(){console.log('hello')}), []);
});

test('generator function', t => {
	t.deepEqual(fnArgs(function * (foo, bar) {}), ['foo', 'bar']);

	t.deepEqual(fnArgs(function* /* something */may(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	){}), ['go', 'here']);

	t.deepEqual(fnArgs(function* () {}), []);
	t.deepEqual(fnArgs(function*(){console.log('hello')}), []);
});

test('arrow function', t => {
	t.deepEqual(fnArgs((foo, bar) => {}), ['foo', 'bar']);
	t.deepEqual(fnArgs(( foo ) => {}), ['foo']);
	t.deepEqual(fnArgs(foo=>{}), ['foo']);

	t.deepEqual(fnArgs(/* something */(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	)=>{}), ['go', 'here']);

	t.deepEqual(fnArgs(() => {}), []);
	t.deepEqual(fnArgs(()=>{console.log('hello')}), []);
});

test('rest parameters', t => {
	t.deepEqual(fnArgs((...args) => {}), ['...args']);
	t.deepEqual(fnArgs((arg1, arg2,...args) => {}), ['arg1', 'arg2', '...args']);
});

test('default parameters', t => {
	t.deepEqual(fnArgs((foo = 2, bar = false) => {}), ['foo', 'bar']);

	t.deepEqual(fnArgs((foo = {
		key1: [1, 2, 3],
		key2: [4, 5, 6]
	}, bar = '(, , , )') => {}), ['foo', 'bar']);

	t.deepEqual(fnArgs((foo = ')', bar) => {}), ['foo', 'bar']);
	t.deepEqual(fnArgs((foo = `${'test'}`, bar={str:'?" " " ", , '}) => {}), ['foo', 'bar']);
	t.deepEqual(fnArgs((foo = /\w\W\w/gi) => {}), ['foo']);
});

test('throws if wrong type', t => {
	t.throws(() => {
		fnArgs('');
	});
});

if (semver.gt(process.versions.node, '7.0.0')) {
	require('./test-newer');
}
