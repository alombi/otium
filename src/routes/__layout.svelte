<script>
   import supabase from '$lib/db';
   import { session } from '$app/stores';
   import { browser } from '$app/env';
   import Navbar from '../components/Navbar.svelte';
   import Sidebar from '../components/Sidebar.svelte';
   import Notifications from 'svelte-notifications';

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
      <slot></slot>
   </div>
</div>
</Notifications>