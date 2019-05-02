import {expectType} from 'tsd';
import functionArguments = require('.');

expectType<string[]>(
	functionArguments(function(foo: string, bar: number) {
		return true;
	})
);
expectType<string[]>(functionArguments((foo: string, bar: number) => true));
expectType<string[]>(
	functionArguments(function * (foo: string, bar: number) {
		return true;
	})
);
expectType<string[]>(
	functionArguments(async function(foo: string, bar: number) {
		return true;
	})
);
