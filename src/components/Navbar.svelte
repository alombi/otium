<script>
  import supabase from '$lib/db';
  import { session } from '$app/stores';
  import { Jumper } from 'svelte-loading-spinners'
  import { loading } from '$lib/utils';
  import { notifsUnread } from '$lib/tag_store';
  export let notifications = []
  if(notifications.length > 0){
    notifsUnread.set(true)
  }

  function toggleSidebar(){
    if(document.getElementById('sidebar').style.display == 'none'){
      if(screen.width > 550){
        document.getElementById('page').style.paddingLeft = '240px';
      }
      document.getElementById('sidebar').style.display = 'block'
    }else{
      document.getElementById('page').style.paddingLeft = 0;
      document.getElementById('sidebar').style.display = 'none'
    }
  }
  async function logOut(){
    const { error } = await supabase.auth.signOut()
    if(error){
      alert(error.message)
    }
  }
</script>

<nav class="navbar">
  <div class="navbar-left">
    <button on:click={toggleSidebar} id="sidebarOpener" class="toolsButton"><i class="fa fa-bars" aria-hidden="true"></i></button>
    <a id="navbarBrand" href="/">Otium<!--  <code>v0.1</code></a> -->
  </div>
  
  <div class="navbar-right">
    {#if $session}
      <a class:unread_notification={$notifsUnread} class="toolsButton" on:click={()=>{loading('/notifications')}} href="/notifications"><i class="fa-solid fa-bell"></i></a>
      <button on:click={logOut} class="buttonAuth">Log out</button>
    {:else}
      <form id="loginInNavbar" on:submit|preventDefault={signIn}> 
        <button on:click={()=>window.location.href ='/auth'} id="alternativeButton" class="buttonAuth">Sign in</button>
      </form>
    {/if}
  </div>
</nav>

<style>
  .unread_notification{
    color:#ED8698
  }
</style>
