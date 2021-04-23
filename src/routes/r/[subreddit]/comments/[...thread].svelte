<script context='module'>
	import { BASE_URL } from '$lib/api.js';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load ({ page: { params } }) {
		let { subreddit, thread } = params;

		let url = new URL(`${BASE_URL}/r/${subreddit}/comments/${thread}.json`);

		let response = await fetch(url);
		let json = await response.json();

		let parent = json[0].data;
		let comments = json[1].data;

		return { props: { parent, comments } };
	}
</script>

<script>
	import { page } from '$app/stores';

	import SubredditHeader from '$lib/components/SubredditHeader.svelte';
	import ThreadDetail from '$lib/components/ThreadDetail.svelte';
	import CommentListing from '$lib/components/CommentListing.svelte';

	import { decode_entities } from '$lib/html-entities.js';

	export let parent = null;
	export let comments = null;

	$: subreddit = $page.params.subreddit;
	$: title = parent.children[0].data.title;
</script>

<svelte:head>
	<title>{decode_entities(title)} | r/{subreddit}</title>
</svelte:head>

<SubredditHeader subreddit={subreddit} />
<ThreadDetail data={parent} />
<CommentListing data={comments} />
