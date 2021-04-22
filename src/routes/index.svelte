<script context='module'>
	/** @type {import('@sveltejs/kit').Load} */
	export function load () {
		return { status: 302, redirect: `/r/all/hot` };
	}
</script>
