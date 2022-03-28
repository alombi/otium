<script context="module">
   import supabase from '$lib/db';
   export async function load(){
      let notifications = [];
      try{
         const id = supabase.auth.session().user.id
         notifications = await supabase.from('notifications').select('*').eq('user', id).is('isRead', false)
         notifications = notifications.data
      }catch{}
      return {props:{notifications}}
   }
</script>

<script>
   import { session } from '$app/stores';
   import { browser } from '$app/env';
   import Navbar from '../components/Navbar.svelte';
   import Sidebar from '../components/Sidebar.svelte';
   import Notifications from 'svelte-notifications';
   import { Jellyfish } from 'svelte-loading-spinners';
   import { Modals, closeModal } from 'svelte-modals'
   import '$lib/stylesheets/main.css';
   if(browser){
      $session = supabase.auth.session()
      supabase.auth.onAuthStateChange((event, supabaseSession) => {
         $session = supabaseSession
      })
   }
   export let notifications = [];
</script>


<Notifications>
<div>
   <Sidebar />
   <Navbar notifications={notifications} />
   <div id="page" class="page">
      <div id="real-page">
         <slot></slot>
      </div>
      <div id="waitingForBookshelfPageToBeOpened" class="loader"><Jellyfish size="120" color="#f2b3cf" unit="px" duration="1s"></Jellyfish></div>
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
   #waitingForBookshelfPageToBeOpened{
      display: none;
   }
   .backdrop {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: rgba(0,0,0,0.50);
   }
</style>