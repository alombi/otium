<script>
    import BookCard from "$lib/components/BookCard.svelte";
    import ISO6391 from 'iso-639-1';
    export let data;
	$: ({ results, query } = data);
    let searchTerm, langCode;
    function search(){
        if(window.localStorage.getItem('language') != undefined){
            langCode = ISO6391.getCode(window.localStorage.getItem('language'))
        }
        const url = '/search?q=' + searchTerm + '&lang=' + langCode;
        window.location.href = url;
    }
</script>

<svelte:head>
    <title>Otium | Searching</title>
</svelte:head>

<div id="searchBar-local">
    <form class="searchBar-alt searchBar-search-and-profile" on:submit|preventDefault={search}>
        <input type="text" class="textForm" placeholder="Search per title" required="required" bind:value={searchTerm}>
        <button id="searchButton" type="submit"><i class="fas fa-search"></i></button>
    </form>
</div>

<h1>Search results for: <i>"{query}"</i></h1>
<div id="books" class="book-list layout-list">
    {#each results as book}
        <BookCard book={book} />
    {/each}
</div>