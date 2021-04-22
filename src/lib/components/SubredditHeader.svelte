<script>
	import { page } from '$app/stores';
	import { FEED_SORT, ITEM_PER_PAGE } from '$lib/api.js';

	export let subreddit;
	export let sort = null;

	export let data = null;

	$: page_count = $page.query.has('page') ? parseInt($page.query.get('page')) : 0;

	$: before_id = data?.children[0]?.data.name;
	$: after_id = data?.after;

	$: before_href = `/r/${subreddit}/${sort}?page=${page_count - 1}&before=${before_id}`;
	$: after_href = `/r/${subreddit}/${sort}?page=${page_count + 1}&after=${after_id}`;
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
			{#if page_count > 0 && before_id}
				<a href={before_href}>prev</a>
			{/if}
			{#if after_id}
				<a href={after_href}>next</a>
			{/if}
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

	.subreddit {
		font-weight: bold;
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
		display: flex;
		gap: 8px;
		margin-inline-start: auto;
	}
	.page-nav a {
		color: var(--link-normal);
	}
</style>
