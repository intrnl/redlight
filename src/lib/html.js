import { decode_entities } from '$lib/html-entities.js';


let REDDIT_LINK_RE = /(?<=<a href=")(?:(?:[a-z]+:)?\/\/)?(?:[a-z]+\.)?reddit\.com(?=\/[ru]\/.+")/gi;

export function transform_html (html) {
	html = decode_entities(html);
	html = html.replace(REDDIT_LINK_RE, '');
	return html;
}
