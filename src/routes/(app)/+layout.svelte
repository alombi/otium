<script>
    import Header from '$lib/components/Header.svelte';
	import "$lib/style/main.css";
	import Sidebar from '$lib/components/Sidebar.svelte';
    import Notifications from 'svelte-notifications';
    import { Modals, closeModal } from 'svelte-modals'
    export let data;
	$: ({ notifications } = data);
</script>

<Notifications>
<Sidebar />
<Header notifications={notifications}/>
<div id="page" class="page">
    <div id="real-page">
       <slot></slot>
    </div>
</div>
<Modals>
    <div
      slot="backdrop"
      class="backdrop"
      on:click={closeModal}
    />
 </Modals>
</Notifications>


<style>
    .backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0,0,0,0.50);
    }
</style>