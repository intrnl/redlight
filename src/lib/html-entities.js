import { ENTITIES, WINDOWS_1252 } from '$lib/misc/html-entities-map.js';


let entity_pattern = new RegExp(
	`&(#?(?:x[\\w\\d]+|\\d+|${Object.keys(ENTITIES).join('|')}))(?:;|\\b)`,
	'g'
);

export function decode_entities (html) {
	return html.replace(entity_pattern, (match, entity) => {
		let code;

		// Handle named entities
		if (entity[0] !== '#') {
			code = ENTITIES[entity];
		} else if (entity[1] === 'x') {
			code = parseInt(entity.substring(2), 16);
		} else {
			code = parseInt(entity.substring(1), 10);
		}

		if (!code) {
			return match;
		}

		return String.fromCodePoint(validate_code(code));
	});
}

function validate_code (code) {
	// line feed becomes generic whitespace
	if (code === 10) return 32;

	// ASCII range. (Why someone would use HTML entities for ASCII characters I don't know, but...)
	if (code < 128) return code;

	// code points 128-159 are dealt with leniently by browsers, but they're incorrect. We need
	// to correct the mistake or we'll end up with missing € signs and so on
	if (code <= 159) return WINDOWS_1252[code - 128];

	// basic multilingual plane
	if (code < 55296) return code;

	// UTF-16 surrogate halves
	if (code <= 57343) return 0;

	// rest of the basic multilingual plane
	if (code <= 65535) return code;

	// supplementary multilingual plane 0x10000 - 0x1ffff
	if (code >= 65536 && code <= 131071) return code;

	// supplementary ideographic plane 0x20000 - 0x2ffff
	if (code >= 131072 && code <= 196607) return code;

	return 0;
}
