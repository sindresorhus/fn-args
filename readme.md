# fn-args [![Build Status](https://travis-ci.org/sindresorhus/fn-args.svg?branch=master)](https://travis-ci.org/sindresorhus/fn-args)

> Get the arguments of a function/generatorFunction/asyncFunction


## Install

```sh
$ npm install --save fn-args
```


## Usage

```js
var fn = function (foo, bar) {};

fnArgs(fn);
//=> ['foo', 'bar']

fn = function* (foo, bar) {};

fnArgs(fn);
//=> ['foo', 'bar']

fn = async function (foo, bar) {};

fnArgs(fn);
//=> ['foo', 'bar']
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
