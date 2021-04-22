<script>
	import Thread from '$lib/components/Thread.svelte';

	export let data;

	$: console.log(data.children);
</script>


<div class='listing'>
	{#each data.children as { data: item }}
		<Thread data={item} />
	{/each}
</div>

<style>
	.listing {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
