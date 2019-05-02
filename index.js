'use strict';
module.exports = fn => {
	if (typeof fn !== 'function') {
		throw new TypeError('Expected a function');
	}

	const commentRegex = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
	const quotes = ['`', '"', '\''];

	const functionSource = fn.toString().replace(commentRegex, ''); // Function with no comments

	let depth = 0; // () [] {}
	let fnNoDefaults = ''; // Function with no default values
	let i = 0;

	// To remove default values we can not use regexp because finite automaton can not handle such
	// things as (potential) infinity-nested blocks (), [], {}

	// Remove default values
	for (; i < functionSource.length && functionSource.charAt(i) !== ')'; i += 1) {
		// Exiting if an arrow occurs. Needed when arrow function without '()'.
		if (functionSource.startsWith('=>', i)) {
			fnNoDefaults = functionSource;
			i = functionSource.length;
			break;
		}

		// If we found a default value - skip it
		if (functionSource.charAt(i) === '=') {
			for (; i < functionSource.length && ((functionSource.charAt(i) !== ',' && functionSource.charAt(i) !== ')') || depth !== 0); i += 1) {
				// Skip all quotes
				let wasQuote = false;

				for (let j = 0; j < quotes.length; j += 1) {
					if (functionSource.charAt(i) === quotes[j]) {
						i += 1;

						for (; i < functionSource.length && functionSource.charAt(i) !== quotes[j];) {
							i += 1;
						}

						wasQuote = true;
						break;
					}
				}

				// If any quote type was skipped, start the cycle again
				if (wasQuote) {
					continue;
				}

				switch (functionSource.charAt(i)) { // Keeps correct depths of all types of parenthesises
					case '(':
					case '[':
					case '{':
						depth += 1;
						break;
					case ')':
					case ']':
					case '}':
						depth -= 1;
						break;
					default:
				}
			}

			if (functionSource.charAt(i) === ',') {
				fnNoDefaults += ',';
			}

			if (functionSource.charAt(i) === ')') { // Quits from the cycle immediately
				fnNoDefaults += ')';
				break;
			}
		} else {
			fnNoDefaults += functionSource.charAt(i);
		}
	}

	if (i < functionSource.length && functionSource.charAt(i) === ')') {
		fnNoDefaults += ')';
	}

	// The first part matches parens-less arrow functions
	// The second part matches the rest
	const regexFnArguments = /^(?:async)?([^=()]+)=|\(([^)]+)\)/;

	const match = regexFnArguments.exec(fnNoDefaults);

	return match ? (match[1] || match[2]).split(',').map(x => x.trim()).filter(Boolean) : [];
};
