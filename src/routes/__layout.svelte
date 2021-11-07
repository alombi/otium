<script>
   import supabase from '$lib/db';
   import { session } from '$app/stores';
   import { browser } from '$app/env';
   import Navbar from '../components/Navbar.svelte';
   import Sidebar from '../components/Sidebar.svelte';

   if(browser){
      $session = supabase.auth.session()
      console.log($session)
      supabase.auth.onAuthStateChange((event, supabaseSession) => {
         $session = supabaseSession
      })
   }
</script>


<div>
   <Sidebar />
   <Navbar />
   <div id="page" class="page">
      <slot></slot>
   </div>
</div>