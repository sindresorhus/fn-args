import {expectType} from 'tsd';
import functionArguments from './index.js';

expectType<string[]>(
	functionArguments((_foo: string, _bar: number) => true),
);
expectType<string[]>(functionArguments((_foo: string, _bar: number) => true));
expectType<string[]>(
	functionArguments(function * (_foo: string, _bar: number) { // eslint-disable-line require-yield
		return true;
	}),
);
expectType<string[]>(
	functionArguments(async (_foo: string, _bar: number) => true),
);
