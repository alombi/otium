<script>
  import supabase from '$lib/db';
  import { session } from '$app/stores';

  function toggleSidebar(){
    console.log(screen.width)
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

  let email;
  async function signIn(){
    const { user, session, error } = await supabase.auth.signIn({
      email: email
    })
    if(error){
      alert(error.message)
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
    <a id="navbarBrand" href="/">Otium <code>v0.1</code></a>
  </div>
  
  <div class="navbar-right">
    {#if $session}
      <button on:click={logOut} class="buttonAuth">Log out</button>
    {:else}
    <form class="" on:submit|preventDefault={signIn}> 
      <input id="navForm" type="text" class="textForm" placeholder="Email address" required="required" bind:value={email}>
      <button id="loginButton" class="buttonAuth" type="submit">Sign in</button>
      <button on:click={()=>window.location.href ='/auth'} id="alternativeButton" class="buttonAuth">Sign in</button>
    </form>
    {/if}
  </div>
</nav>