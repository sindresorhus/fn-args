# fn-args [![Build Status](https://travis-ci.org/sindresorhus/fn-args.png?branch=master)](https://travis-ci.org/sindresorhus/fn-args)

> Get the arguments of a function


## Install

Download [manually](https://github.com/sindresorhus/fn-args/releases) or with a package-manager.

#### [npm](https://npmjs.org/package/fn-args)

```
npm install --save fn-args
```

#### [Bower](http://bower.io)

```
bower install --save fn-args
```

#### [Component](https://github.com/component/component)

```
component install sindresorhus/fn-args
```


## Example

```js
var fn = function (foo, bar) {};

fnArgs(fn);
//=> ['foo', 'bar']
```


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
