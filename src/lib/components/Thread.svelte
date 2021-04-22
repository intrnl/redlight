<script>
	import { format_number } from '$lib/number.js';
	import { diff_time, to_utc } from '$lib/time.js';
	import Dot from '$lib/components/Dot.svelte';

	export let data;

	$: is_external = !!data.url_overridden_by_dest;
	$: url = data.url_overridden_by_dest || `/r/${data.subreddit}/comments/${data.id}`;
</script>

<div class='item'>
	<div class='side'>
		<span class='score'>{format_number(data.score)}</span>
		<time class='age' datetime={to_utc(data.created_utc)}>{diff_time(data.created_utc)}</time>
	</div>
	<div class='story'>
		<a class='title' rel={is_external ? 'external' : ''} href={url}>{@html data.title}</a>
		<span class='domain'>{data.domain}</span>
		<div class='byline'>
			<a class='author' href='/u/{data.author}'>u/{data.author}</a>
			<Dot />
			<a class='subreddit' href='/r/{data.subreddit}'>r/{data.subreddit}</a>
			<Dot />
			<a class='comments' href='/r/{data.subreddit}/comments/{data.id}'>{format_number(data.num_comments)} comments</a>
		</div>
	</div>
</div>


<style>
	.item {
		display: flex;
		gap: 8px;
	}

	.side {
		color: var(--alt-text);
		text-align: center;
		display: flex;
		flex-direction: column;
		width: 5ch;
		flex-shrink: 0;
	}

	.title {
		font-weight: bold;
		text-decoration: none;
	}

	.domain {
		font-style: italic;
		opacity: 0.65;
	}

	.byline {
		opacity: 0.65;
	}

	.byline a {
		color: currentColor;
		text-decoration: none;
	}
</style>
