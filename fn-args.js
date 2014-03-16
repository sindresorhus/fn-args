/*!
	fn-args
	Get the arguments of a function
	https://github.com/sindresorhus/fn-args
	by Sindre Sorhus
	MIT License
*/
(function () {
	'use strict';

	var reFnArgs = /\(([^)]*)\)/;

	var fnArgs = function (fn) {
		if (typeof fn !== 'function') {
			throw new TypeError('Expected a function');
		}
		
		if (fn.length === 0) {
			return [];
		}

		var match = reFnArgs.exec(fn.toString());

		return match && match[1].length > 0 ? match[1].split(',').map(function (el) {
			return el.trim();
		}) : [];
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = fnArgs;
	} else {
		window.fnArgs = fnArgs;
	}
})();
