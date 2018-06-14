# fn-args [![Build Status](https://travis-ci.org/sindresorhus/fn-args.svg?branch=master)](https://travis-ci.org/sindresorhus/fn-args)

> Get the arguments of a function, arrow function, generator function, async function


## Install

```
$ npm install fn-args
```


## Usage

```js
const fnArgs = require('fn-args');

fnArgs(function (foo, bar) {});
//=> ['foo', 'bar']

fnArgs((foo, bar) => {});
//=> ['foo', 'bar']

fnArgs(function * (foo, bar) {});
//=> ['foo', 'bar']

fnArgs(async function (foo, bar) {});
//=> ['foo', 'bar']
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
