'use strict';
var assert = require('assert');
var fnArgs = require('./fn-args');

it('should get the arguments of a function', function () {
	assert.deepEqual(fnArgs(function (foo, bar) {}), ['foo', 'bar']);
	assert.deepEqual(fnArgs(function () {}), []);
});
