<script>
	import { applyAction, enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { Jellyfish } from 'svelte-loading-spinners';
	import { onMount } from 'svelte';

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
			setTimeout(() => {
				loading = false;
			}, 1000);
		};
	};

	onMount(()=>{
		document.getElementById('header-login-button').style.display = 'none';
	})
</script>

<div id="loginFromPage">
    <h1>Login</h1>
    {#if form?.error}
		<h4 class="error-message">{form.error}</h4>
	{/if}
    {#if !loading}
		<form method="post" use:enhance={handleSubmit}> 
			<input id="email" name="email" value={form?.values?.email ?? ''} class="input textForm" type="email" placeholder="Email" required />
			<input id="password" name="password" class="input textForm" type="password" placeholder="Password" required /><br><br>
			<button class="buttonAuth" disabled={loading} type="submit">Sign in</button>
		</form>
		<br>
		<p>New to Otium? <a href="/signup">Create an account!</a></p>
	{:else}
		<div id="loader" class="loader"><Jellyfish size="120" color="#f2b3cf" unit="px" duration="1s"></Jellyfish></div>
	{/if}
</div>

<style>
	#loader{
		padding-top: 130px;
	}
</style>