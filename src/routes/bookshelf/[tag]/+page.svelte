<script>
    export let data
    $:({ bookshelf, tag } = data)
    import { bookshelfTag } from '$lib/stores'
    import { page } from '$app/stores';
    import BookCard from '$lib/components/BookCard.svelte';

    const titles = {
        'reading': 'Reading now',
        'to_read': 'To read',
        'read': 'Already read',
        'favorites': 'Favorites',
        'unset': 'Untagged'
    }
    if($bookshelfTag == ''){
        $bookshelfTag = $page.params.tag
    }
</script>

<svelte:head>
    <title>Otium Bookshelf | {titles[tag]}</title>
</svelte:head>

{#if $bookshelfTag == tag}
    <h1>{titles[tag]}</h1>
    {#if bookshelf.length > 0}
        <div id="books" class="book-list">
            {#each bookshelf as book}
                <BookCard {book} tagshelf={true} />
            {/each}
        </div>
    {:else}
        <p>Nothing here yet</p>
    {/if}
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