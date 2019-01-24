'use strict';
module.exports = fn => {
	if (typeof fn !== 'function') {
		throw new TypeError('Expected a function');
	}

	const reComments = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
	const quotes = ['`', '"', '\''];

	const fnNC = fn.toString().replace(reComments, ''); // Function with no comments

	let depth = 0; // () [] {}
	let fnND = ''; // Function with no default values
	let i = 0;

	// To remove default values we can not use regexp because finite automaton can not handle such
	// things as (potential) infinity-nested blocks (), [], {}

	// Remove default values
	for (; i < fnNC.length && fnNC.charAt(i) !== ')'; i += 1) {
		// Exiting if an arrow occurs. Needed when arrow function without '()'.
		if (fnNC.startsWith('=>', i)) {
			fnND = fnNC;
			i = fnNC.length;
			break;
		}

		// If we found a default value - skip it
		if (fnNC.charAt(i) === '=') {
			for (; i < fnNC.length && ((fnNC.charAt(i) !== ',' && fnNC.charAt(i) !== ')') || depth !== 0); i += 1) {
				// Skip all quotes
				let wasQuote = false;

				for (let j = 0; j < quotes.length; j += 1) {
					if (fnNC.charAt(i) === quotes[j]) {
						i += 1;

						for (; i < fnNC.length && fnNC.charAt(i) !== quotes[j];) {
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

				switch (fnNC.charAt(i)) { // Keeps correct depths of all types of parenthesises
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

			if (fnNC.charAt(i) === ',') {
				fnND += ',';
			}

			if (fnNC.charAt(i) === ')') { // Quits from the cycle immediately
				fnND += ')';
				break;
			}
		} else {
			fnND += fnNC.charAt(i);
		}
	}

	if (i < fnNC.length && fnNC.charAt(i) === ')') {
		fnND += ')';
	}

	// The first part matches parens-less arrow functions
	// The second part matches the rest
	const reFnArgs = /^(?:async)?([^=()]+)=|\(([^)]+)\)/;

	const match = reFnArgs.exec(fnND);

	return match ? (match[1] || match[2]).split(',').map(x => x.trim()).filter(Boolean) : [];
};
