<script context='module'>
	import { BASE_URL, FEED_SORT } from '$lib/api.js';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load ({ page: { params, query } }) {
		let { subreddit, sort } = params;

		if (!FEED_SORT.includes(sort)) {
			return { status: 302, redirect: `/r/${subreddit}/hot` };
		}

		let url = new URL(`${BASE_URL}/r/${subreddit}/${sort}.json`);
		if (query.has('count')) url.searchParams.set('count', query.get('count'));
		if (query.has('before')) url.searchParams.set('before', query.get('before'));
		if (query.has('after')) url.searchParams.set('after', query.get('after'));

		let response = await fetch(url);
		let json = await response.json();

		return { props: { data: json.data } };
	}
</script>

<script>
	import { page } from '$app/stores';
	import ThreadListing from '$lib/components/ThreadListing.svelte';
	import SubredditHeader from '$lib/components/SubredditHeader.svelte';

	export let data = null;

	$: subreddit = $page.params.subreddit;
	$: sort = $page.params.sort;
</script>

<svelte:head>
	<title>r/{subreddit}</title>
</svelte:head>

<SubredditHeader subreddit={subreddit} sort={sort} data={data} />
<ThreadListing data={data} />
