<script>
    import "../lib/stylesheets/main.css";
    import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Navbar from "../lib/components/Navbar.svelte";
	import Sidebar from "../lib/components/Sidebar.svelte"
	import Footer from "../lib/components/Footer.svelte"
	export let data;
	$: ({ notifications } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
	let sidebarOpen = false;
</script>

<main class="container">
	<Sidebar bind:sidebarOpen />
	<Navbar bind:sidebarOpen {notifications} />
    <div class="page"><slot></slot></div>
	<br>
	<!-- <hr> -->
	<!-- <Footer /> -->
</main>


<style>
	.page{
		padding-top: 100px;
	}
</style>