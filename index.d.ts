/**
Get the arguments of a function, arrow function, generator function, async function.

@example
```
import functionArguments from 'fn-args';

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
export default function functionArguments(
	function_: (...arguments: any[]) => any
): string[];
