<script>
	import { applyAction, enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';

	export let form;
	let loading = false;

	const handleSubmit = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			} else {
				await applyAction(result);
			}
			loading = false;
		};
	};
    
</script>

<div id="loginFromPage">
    <h1>Login</h1>
    {#if form?.error}
		<h4 class="error-message">{form.error}</h4>
	{/if}
    <form method="post" use:enhance={handleSubmit}> 
        <input id="email" name="email" value={form?.values?.email ?? ''} class="input textForm" type="email" placeholder="Email" required />
        <input id="password" name="password" class="input textForm" type="password" placeholder="Password" required /><br><br>
        <button class="buttonAuth" disabled={loading} type="submit">Sign in</button>
    </form>
    <br>
    <p>New to Otium? <a href="/signup">Create an account!</a></p>
</div>
