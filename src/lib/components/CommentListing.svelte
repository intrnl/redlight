<script>
	import Comment from '$lib/components/Comment.svelte';

	export let data;
</script>

<div class='listing'>
	{#each data.children as child}
		{#if child.kind == 't1'}
			<Comment data={child.data} />
		{/if}
	{/each}
</div>

<style>
	.listing {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
