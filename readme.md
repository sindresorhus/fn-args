# fn-args [![Build Status](https://travis-ci.org/sindresorhus/fn-args.svg?branch=master)](https://travis-ci.org/sindresorhus/fn-args)

> Get the arguments of a function, arrow function, generator function, async function


## Install

```
$ npm install fn-args
```


## Usage

```js
const functionArguments = require('fn-args');

functionArguments(function (foo, bar) {});
//=> ['foo', 'bar']

functionArguments((foo, bar) => {});
//=> ['foo', 'bar']

functionArguments(function * (foo, bar) {});
//=> ['foo', 'bar']

functionArguments(async function (foo, bar) {});
//=> ['foo', 'bar']
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
