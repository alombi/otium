<script>
    import BookCard from "$lib/components/BookCard.svelte";
    import Search from "$lib/components/Search.svelte";
    import { browser } from "$app/environment";
    export let data;
	$: ({ results, query } = data);
    // if(data.results.length == 0 && browser){
    //     document.getElementsByClassName('footer')[0].style.display = 'none';
    // }
</script>

<svelte:head>
    <title>Otium | Searching</title>
</svelte:head>

<Search />
{#if results.length > 0}
    <h1>Results for "{query}"</h1>
    <div class="book-list">
        {#each results as book}
            <BookCard {book} />
        {/each}
    </div>
{/if}

<style>
    .book-list{
        display: grid;
        grid-template-columns: 100%;
        gap: 20px;
    }
    @media only screen and (min-width: 768px) {
        .book-list {
            grid-template-columns: 50% 50%;
        }
    }
</style>