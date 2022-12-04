<script>
    import ISO6391 from 'iso-639-1';
    import Shelf from '$lib/components/Shelf.svelte';
    export let data;
	$: ({ bookshelf, user } = data);
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
   <title>Otium | A free and open source bookshelf organizer</title>
</svelte:head>


<div class="centered-welcome">
    <h1>Welcome back</h1>
    <form class="searchBar-alt" on:submit|preventDefault={search}>
        <input type="text" class="textForm" placeholder="Search per title" required="required" bind:value={searchTerm}>
        <button id="searchButton" type="submit"><i class="fas fa-search"></i></button>
     </form>
</div>
<h2>Reading now</h2>
<Shelf bookshelf={bookshelf} />