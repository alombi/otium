<script>
    import TagShelf from "$lib/components/TagShelf.svelte";
    import { Jellyfish } from 'svelte-loading-spinners';
    export let data
    $:({ bookshelf, tag } = data)
    import { bookshelfTag } from '$lib/stores'
    import { page } from '$app/stores';

    const titles = {
        'reading': 'Reading now',
        'to_read': 'To read',
        'read': 'Already read',
        'favorites': 'Favorites',
        'untagged': 'Untagged'
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
    <div id="books" class="book-list layout-list">
        <TagShelf bookshelf={bookshelf} />
    </div>
{:else}
    <div id="loader" class="loader"><Jellyfish size="120" color="#f2b3cf" unit="px" duration="1s"></Jellyfish></div>
{/if}