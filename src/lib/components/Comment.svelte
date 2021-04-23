<script>
	import Dot from '$lib/components/Dot.svelte';

	import { format_number } from '$lib/number.js';
	import { diff_time, to_utc } from '$lib/time.js';
	import { transform_html } from '$lib/html.js';

	export let data;
	export let level = 0;
	export let index = 0;

	$: open = !data.collapsed && level < 3 && index < 3;
</script>

<details class='comment' open={open}>
	<summary class='byline'>
		<a class='author' href='/u/{data.author}'>{data.author}</a>
		<Dot />
		<time class='age' datetime={to_utc(data.created_utc)}>{diff_time(data.created_utc)}</time>
		<Dot />
		<span class='score'>{data.score > 0 ? '+' : ''}{format_number(data.score)}</span>
	</summary>
	<div class='content'>{@html transform_html(data.body_html)}</div>
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
	.byline {
		opacity: 0.65;
	}
	.byline a {
		color: currentColor;
	}

	.author {
		font-weight: 500;
	}

	.child {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-top: 8px;
		padding-left: 8px;
		border-left: 1px dotted var(--alt-text);
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
	.content :global(ol) {
		padding-left: 20px;
	}
</style>
