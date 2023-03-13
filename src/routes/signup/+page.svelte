<script>
    import { page } from '$app/stores'
    import { AlertTriangle } from 'lucide-svelte'
    export let form
</script>


<h1>Crea un account</h1>
{#if form?.error}
    <button class="error"><AlertTriangle /> {form?.error}</button>
{/if}
<form method="post">
    <div class="grid">
        <label for="email">
            Email
            <input type="email" id="email" name="email" placeholder="Email" required>
        </label>

        <label for="password">
            Password
            <input type="password" id="password" name="password" placeholder="Password" required>
        </label>

    </div>
    <button type="submit">Crea account</button>
    <p><small>Hai già un account? <a href="/">Fai login</a></small></p>
</form>

<style>
    h1{
        margin-bottom: 20px;
    }
</style>