<script>
   import supabase from '$lib/db';
   import { session } from '$app/stores';
   import { browser } from '$app/env';
   import Navbar from '../components/Navbar.svelte';
   import Sidebar from '../components/Sidebar.svelte';
   import Notifications from 'svelte-notifications';
   import { Jellyfish } from 'svelte-loading-spinners';
   import '$lib/stylesheets/main.css';
   if(browser){
      $session = supabase.auth.session()
      supabase.auth.onAuthStateChange((event, supabaseSession) => {
         $session = supabaseSession
      })
   }
</script>


<Notifications>
<div>
   <Sidebar />
   <Navbar />
   <div id="page" class="page">
      <div id="real-page">
         <slot></slot>
      </div>
      <div id="waitingForBookshelfPageToBeOpened" class="loader"><Jellyfish size="120" color="#f2b3cf" unit="px" duration="1s"></Jellyfish></div>
   </div>
</div>
</Notifications>

<style>
   #waitingForBookshelfPageToBeOpened{
      display: none;
   }
</style>