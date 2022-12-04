<script>
	import { applyAction, enhance } from '$app/forms';

	export let form;
	let loading = false;

	const handleSubmit = () => {
		loading = true;
		return async ({ result }) => {
			await applyAction(result);
			loading = false;
		};
	};
</script>

<div id="loginFromPage">
    <h1>Create an account</h1>
    {#if form?.error}
		<h4 class="error-message">{form.error}</h4>
	{/if}
    {#if form?.message}
			<div class="block notification is-primary">{form.message}</div>
    {/if}
    <form method="post" use:enhance={handleSubmit}> 
        <input id="email" name="email" value={form?.values?.email ?? ''} class="input textForm" type="email" placeholder="Email" required />
        <input id="password" name="password" class="input textForm" type="password" placeholder="Password" required /><br><br>
        <button class="buttonAuth" disabled={loading} type="submit">Sign up</button>
    </form>
    <br>
    <p>Already have an account? <a href="/">Login!</a></p>
</div>
