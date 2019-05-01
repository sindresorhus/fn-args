import test from 'ava';
import semver from 'semver';
import functionArguments from '.';

test('function', t => {
	t.deepEqual(functionArguments(function (foo, bar) {}), ['foo', 'bar']);

	t.deepEqual(functionArguments(function /* something */may(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	){}), ['go', 'here']);

	t.deepEqual(functionArguments(function () {}), []);
	t.deepEqual(functionArguments(function(){console.log('hello')}), []);
});

test('generator function', t => {
	t.deepEqual(functionArguments(function * (foo, bar) {}), ['foo', 'bar']);

	t.deepEqual(functionArguments(function* /* something */may(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	){}), ['go', 'here']);

	t.deepEqual(functionArguments(function* () {}), []);
	t.deepEqual(functionArguments(function*(){console.log('hello')}), []);
});

test('arrow function', t => {
	t.deepEqual(functionArguments((foo, bar) => {}), ['foo', 'bar']);
	t.deepEqual(functionArguments(( foo ) => {}), ['foo']);
	t.deepEqual(functionArguments(foo=>{}), ['foo']);

	t.deepEqual(functionArguments(/* something */(
		// go,
		go,
		/* wrong, */
		here
		// (when, using, comments) {}
	)=>{}), ['go', 'here']);

	t.deepEqual(functionArguments(() => {}), []);
	t.deepEqual(functionArguments(()=>{console.log('hello')}), []);
});

test('rest parameters', t => {
	t.deepEqual(functionArguments((...args) => {}), ['...args']);
	t.deepEqual(functionArguments((arg1, arg2,...args) => {}), ['arg1', 'arg2', '...args']);
});

test('default parameters', t => {
	t.deepEqual(functionArguments((foo = 2, bar = false) => {}), ['foo', 'bar']);

	t.deepEqual(functionArguments((foo = {
		key1: [1, 2, 3],
		key2: [4, 5, 6]
	}, bar = '(, , , )') => {}), ['foo', 'bar']);

	t.deepEqual(functionArguments((foo = ')', bar) => {}), ['foo', 'bar']);
	t.deepEqual(functionArguments((foo = `${'test'}`, bar={str:'?" " " ", , '}) => {}), ['foo', 'bar']);
	t.deepEqual(functionArguments((foo = /\w\W\w/gi) => {}), ['foo']);
});

test('throws if wrong type', t => {
	t.throws(() => {
		functionArguments('');
	});
});

if (semver.gt(process.versions.node, '7.0.0')) {
	require('./test-newer');
}
