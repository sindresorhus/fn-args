'use strict';
module.exports = function (fn) {
	if (typeof fn !== 'function') {
		throw new TypeError('Expected a function');
	}

	if (fn.length === 0) {
		return [];
	}

	// from https://github.com/jrburke/requirejs
	var reComments = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;

	var reFnArgs = /^(async )?function\s*[^(]*\(([^)]+)\)/;

	var match = reFnArgs.exec(fn.toString().replace(reComments, ''));

	return match ? match[2].split(',').map(function (el) {
		return el.trim();
	}) : [];
};
