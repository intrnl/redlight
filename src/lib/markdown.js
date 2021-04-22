import marked from 'marked';
import { cleanUrl, escape } from 'marked/src/helpers.js';


let REDDIT_RE = /^(?:(?:[a-z]+:)?\/\/)?(?:[a-z]+\.)?reddit\.com\//i;

marked.use({
	gfm: true,
	headerPrefix: 'h',
	renderer: {
		link (href, title, text) {
			href = cleanUrl(false, '', href);
			if (href === null) return text;

			href = href.replace(REDDIT_RE, '/');

			let res = '';

			res += `<a href="${escape(href)}"`;
			if (title) res += ` title="${title}"`
			res += `>${text}</a>`;

			return res;
		},
		heading (text, level, raw, slugger) {
			let id = `h-${slugger.slug(raw)}`;
			let res = '';

			res += `<h${level}>`;
			res += `<a class="anchor" href="#${id}">#</a>`;
			res += `<div class="anchor-target" id="${id}"></div>`;
			res += text;
			res += `</h${level}>`;

			return res;
		},
	},
});


export function parse_markdown (md) {
	return marked(md);
}
