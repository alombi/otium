<script>
    import { browser } from "$app/environment";
    export let data;
	$: ({ results, query } = data);

    let searchTerm;
    function searchUser(){
        const url = '/search-user?q=' + searchTerm
        window.location.href = url;
    }
</script>

<svelte:head>
    <title>Otium | Searching</title>
</svelte:head>

<form on:submit|preventDefault={searchUser}>
    <input type="search" name="searchUser" id="searchUser" placeholder="Search user" bind:value={searchTerm}>
</form>
{#if results.length > 0}
    <h1>Results for "{query}"</h1>
    <div class="book-list">
        <ul>{#each results as user}
            <li><a href={user.url}>{user.name}</a></li>
        {/each}</ul>
    </div>
{/if}