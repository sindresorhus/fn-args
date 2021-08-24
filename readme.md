# fn-args

> Get the arguments of a function, arrow function, generator function, async function

## Install

```
$ npm install fn-args
```

## Usage

```js
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
