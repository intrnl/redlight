<script>
	import Dot from '$lib/components/Dot.svelte';

	import { format_number } from '$lib/number.js';
	import { diff_time, to_utc } from '$lib/time.js';
	import { parse_markdown } from '$lib/markdown.js';
	import { decode_entities } from '$lib/html.js';

	export let data;
	export let level = 0;
	export let index = 0;

	$: open = !data.collapsed && level < 3 && index < 3;
	$: parsed_html = parse_markdown(decode_entities(data.body));
</script>

<details class='comment' class:nested={level > 0} open={open}>
	<summary class='byline'>
		<a class='author' href='/u/{data.author}'>{data.author}</a>
		<Dot />
		<time class='age' datetime={to_utc(data.created_utc)}>{diff_time(data.created_utc)}</time>
		<Dot />
		<span class='score'>{data.score > 0 ? '+' : ''}{format_number(data.score)}</span>
	</summary>
	<div class='content'>{@html parsed_html}</div>
	<div class='child'>
		{#if data.replies?.data?.children}
			{#each data.replies.data.children as child, index}
				{#if child.kind == 't1'}
					<svelte:self level={level + 1} index={index} data={child.data} />
				{/if}
			{/each}
		{/if}
	</div>
</details>

<style>
	.nested {
		padding-left: 8px;
		border-left: 1px dotted var(--alt-text);
	}

	.byline {
		opacity: 0.65;
		list-style-type: none;
	}
	.byline a {
		color: currentColor;
	}

	.author {
		font-weight: 500;
	}

	.comment > .byline::after {
		content: ' [expand]';
		content: ' [expand]' / 'expand comment';
	}
	.comment[open] > .byline::after {
		content: unset;
	}

	.child {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-top: 8px;
	}
	.child:empty {
		display: none;
	}

	.content :global(*) {
		word-break: break-word;
		margin-top: 0px;
		margin-bottom: 0px;
		position: relative;
	}
	.content :global(* + *) {
		margin-top: 8px;
	}

	.content :global(.anchor) {
		color: var(--alt-text);
		margin-top: -60px;
		padding-top: 60px;
		position: absolute;
		left: -16px;
	}
	.content :global(h1) {
		font-size: 18px;
	}
	.content :global(h2) {
		font-size: 16px;
	}
	.content :global(blockquote) {
		color: var(--quote-text);
		margin-left: 0;
	}
	.content :global(ul) {
		padding-left: 25px;
	}
</style>
