"use strict";

/* FIXME: sorry for different code style. I used my config, moreover, still infringe some rules. Rewrite it as You wish */

module.exports = (fn) => {
	if (typeof fn !== "function") {
		throw new TypeError("Expected a function");
	}

	const
		reComments = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
		quotes     = ["`", "'", '"'];

	const fnNC = fn.toString().replace(reComments, ""); /* fn with no comments */

	let
		p1Depth = 0, /* () */
		p2Depth = 0, /* [] */
		p3Depth = 0, /* {} */
		fnND = "",   /* fn with no default values */
		i = 0;

	/*
	 * to remove default values we can not use regexp because
	 * finite automaton can not handle such things as (potential) infinity-nested blocks (), [], {}
	 */

	/* remove default values */
	for (; i < fnNC.length && fnNC.charAt(i) !== ")"; i += 1) {

		/* exiting if an arrow occurs (needed when arrow function without '()') */
		if (fnNC.startsWith("=>", i)) {
			fnND = fnNC;
			i = fnNC.length;
			break;
		}

		/* if we found a default value - skip it */
		if (fnNC.charAt(i) === "=") {
			for (; i < fnNC.length
				&& (p1Depth !== 0
					|| p2Depth !== 0
					|| p3Depth !== 0
					|| (fnNC.charAt(i) !== "," && fnNC.charAt(i) !== ")")); i += 1) {

				/* skip all quotes */
				let wasQuote = false;

				for (let j = 0; j < quotes.length; j += 1) {
					if (fnNC.charAt(i) === quotes[j]) {
						i += 1;

						for (; i < fnNC.length && fnNC.charAt(i) !== quotes[j]; i += 1) {
						}

						wasQuote = true;
						break;
					}
				}

				/* if any quote type was skipped, start the cycle again */
				if (wasQuote)
					continue;

				switch (fnNC.charAt(i)) { /* keeps right depths of all types of parenthesises */
				case "(":
					p1Depth += 1;
					break;
				case ")":
					p1Depth -= 1;
					break;
				case "[":
					p2Depth += 1;
					break;
				case "]":
					p2Depth -= 1;
					break;
				case "{":
					p3Depth += 1;
					break;
				case "}":
					p3Depth -= 1;
				}
			}

			if (fnNC.charAt(i) === ",")
				fnND += ",";

			if (fnNC.charAt(i) === ")") { /* quits from the cycle immediately */
				fnND += ")";
				break;
			}
		} else
			fnND += fnNC.charAt(i);
	}

	if (i < fnNC.length && fnNC.charAt(i) === ")")
		fnND += ")";

	/* TODO: please, check regexp on having excess data: fnND already has not a function body and arrows */

	// the first part matches parenthesises-less arrow functions
	// the second part matches the rest
	const reFnArgs = /^(?:async)?([^=()]+)=|\(([^)]+)\)/;

	const match = reFnArgs.exec(fnND);

	return match
		? (match[1] || match[2]).split(",").map((el) => el.trim())
		: [];
};