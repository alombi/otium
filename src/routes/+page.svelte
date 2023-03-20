<script>
    import { page } from '$app/stores'
    import { AlertTriangle } from 'lucide-svelte'
    import FirstBook from '../lib/components/FirstBook.svelte';
    import BookList from '../lib/components/BookList.svelte';
    import Search from '$lib/components/Search.svelte';
    export let form
    export let data
    $: ({ username, bookshelf, firstBook } = data)
</script>

<svelte:head>
   <title>Otium</title>
</svelte:head>

{#if $page.data.session}
    <Search />
    <h1>Welcome back {username}</h1>
    {#if firstBook}
        <FirstBook {firstBook} />
        <h3>More readings</h3>
        <div class="grid">
        <BookList {bookshelf} />
        </div>
    {:else}
        <p>You're not reading any books at the moment.</p>
    {/if}
{:else}
    <h1>Login</h1>
    {#if form?.error}
        <button class="error"><AlertTriangle /> {form?.error}</button>
    {/if}
    <form method="post" action="?/login">
        <div class="grid">
            <label for="nome">
                Email
                <input type="email" id="email" name="email" placeholder="Email" required>
            </label>

            <label for="password">
                Password
                <input type="password" id="password" name="password" placeholder="Password" required>
            </label>
        </div>
        <button type="submit">Entra</button>
        <p><small>Non hai un account? <a href="/signup">Creane uno qui</a></small></p>
    </form>
{/if}


<style>
    h3{
        margin-bottom:-15px
    }
    h1{
        margin-bottom: 20px;
    }
    .group{
        display: flex;
        justify-content: space-between;
    }
    .group:hover{
        opacity: 0.7;
}
</style>