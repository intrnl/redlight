<script>
	import { page } from '$app/stores';
	import { FEED_SORT } from '$lib/api.js';

	export let subreddit;
	export let sort = null;

	export let data = null;

	$: count = $page.query.has('count') ? parseInt($page.query.get('count')) : 0;
	$: length = data?.children.length;
	$: before = data?.children[0].data.name;
	$: after = data?.children[data.children.length - 1].data.name;
</script>

<div class='subreddit-header'>
	<span class='subreddit'>r/{subreddit}</span>

	<div class='sort-nav'>
		{#each FEED_SORT as sort_type}
			<a class:selected={sort == sort_type} href='/r/{subreddit}/{sort_type}'>{sort_type}</a>
		{/each}
	</div>

	{#if data}
		<div class='page-nav'>
			{#if count}
				<a href='/r/{subreddit}/{sort}?count={Math.min(0, count - length)}&before={before}'>prev</a>
			{/if}
			<a href='/r/{subreddit}/{sort}?count={count + length}&after={after}'>next</a>
		</div>
	{/if}
</div>

<style>
	.subreddit-header {
		background-color: var(--main-background);
		display: flex;
		gap: 8px;
		padding: 16px 0;
		margin: -16px 0;
		position: sticky;
		top: 0;
		z-index: 1;
	}

	.sort-nav {
		display: flex;
		gap: 8px;
	}

	.sort-nav a {
		color: var(--link-normal);
	}
	.sort-nav a.selected {
		font-weight: bold;
		text-decoration: underline;
	}

	.page-nav {
		margin-inline-start: auto;
	}

	.subreddit {
		font-weight: bold;
	}
</style>
