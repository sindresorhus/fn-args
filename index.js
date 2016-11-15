'use strict';
module.exports = fn => {
	if (typeof fn !== 'function') {
		throw new TypeError('Expected a function');
	}

	if (fn.length === 0) {
		return [];
	}

	const reComments = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
	const reFnArgs = /^(?:async )?function\s*[^(]*\(([^)]+)\)/;
	const match = reFnArgs.exec(fn.toString().replace(reComments, ''));

	return match ? match[1].split(',').map(x => x.trim()) : [];
};
