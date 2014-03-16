/*!
	fn-args
	Get the arguments of a function
	https://github.com/sindresorhus/fn-args
	by Sindre Sorhus
	MIT License
*/
(function () {
	'use strict';

	var reFnArgs = /^function\s*[^(]*\(([^)]+)\)/;

	var fnArgs = function (fn) {
		var match = reFnArgs.exec(fn.toString());

		return match ? match[1].split(',').map(function (el) {
			return el.trim();
		}) : [];
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = fnArgs;
	} else {
		window.fnArgs = fnArgs;
	}
})();
