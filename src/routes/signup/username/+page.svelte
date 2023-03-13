<script>
    import { page } from '$app/stores'
    import { AlertTriangle } from 'lucide-svelte'
    export let form
</script>

<h1>Benvenuto! Imposta un nome utente</h1>
{#if form?.error}
        <button class="error"><AlertTriangle /> {form?.error}</button>
    {/if}
<form method="post">
    <input type="text" id="username" name="username" placeholder="Nome utente" required>
    <button type="submit">Imposta</button>
</form>