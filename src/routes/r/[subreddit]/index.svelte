<script context='module'>
	/** @type {import('@sveltejs/kit').Load} */
	export function load ({ page }) {
		let { subreddit } = page.params;

		return { status: 302, redirect: `/r/${subreddit}/hot` };
	}
</script>
