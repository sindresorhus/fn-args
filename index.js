'use strict';
module.exports = fn => {
	if (typeof fn !== 'function') {
		throw new TypeError('Expected a function');
	}

	if (fn.length === 0) {
		return [];
	}

	const reComments = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;

	// the first part matches parens-less arrow functions
	// the second part matches the rest
	const reFnArgs = /^(?:async)?([^=()]+)=|\(([^)]+)\)/;

	const match = reFnArgs.exec(fn.toString().replace(reComments, ''));

	return match ? (match[1] || match[2]).split(',').map(x => x.trim()) : [];
};
