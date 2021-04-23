<script>
	import Thread from '$lib/components/Thread.svelte';

	import { transform_html } from '$lib/html.js';

	export let data;
	$: post = data.children[0].data;
</script>

<Thread data={post} />

{#if post.media?.reddit_video}
	<details class='details auxiliary'>
		<summary>view video</summary>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video class='video' controls>
			<source src={post.media.reddit_video.fallback_url} />
		</video>
	</details>
{/if}
{#if post.domain == 'i.redd.it'}
	<details class='details auxiliary'>
		<summary>view image</summary>
		<!-- svelte-ignore a11y-missing-attribute -->
		<img class='image' src={post.url} />
	</details>
{/if}

{#if post.selftext}
	<div class='details content'>{@html transform_html(post.selftext_html)}</div>
{/if}

<style>
	.details {
		margin-left: calc(5ch + 8px);
	}

	.auxiliary summary {
		color: var(--alt-text);
		position: relative;
	}

	.image, .video {
		max-width: 100%;
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
		position: absolute;
		left: calc((8px + 16px) * -1);
	}
	.content :global(.anchor-target) {
		position: absolute;
		margin-top: -60px;
		padding-top: 60px;
	}
	.content :global(h1) {
		font-size: 20px;
	}
	.content :global(h2) {
		font-size: 18px;
	}
	.content :global(h3)  {
		font-size: 16px;
	}
	.content :global(h4) {
		font-size: 14px;
	}
	.content :global(h5) {
		font-size: 12px;
	}
	.content :global(h6) {
		color: var(--alt-text);
		font-size: 12px;
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
