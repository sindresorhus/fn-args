/**
Get the arguments of a function, arrow function, generator function, async function.

@example
```
import functionArguments = require('fn-args');

functionArguments(function (foo, bar) {});
//=> ['foo', 'bar']

functionArguments((foo, bar) => {});
//=> ['foo', 'bar']

functionArguments(function * (foo, bar) {});
//=> ['foo', 'bar']

functionArguments(async function (foo, bar) {});
//=> ['foo', 'bar']
```
*/
declare function functionArguments(
	fn: (...arguments: any[]) => unknown
): string[];

export = functionArguments;
