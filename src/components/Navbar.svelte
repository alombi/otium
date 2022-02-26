<script>
  import supabase from '$lib/db';
  import { session } from '$app/stores';
  import { Jumper } from 'svelte-loading-spinners'

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

  let email;
  async function signIn(){
    document.getElementById('loginInNavbar').style.display = 'none';
    document.getElementById('waitingForEmailToBeSentIndicator').style.display = 'block';
    document.getElementById('loginButton').disabled = 'true';
    const { user, session, error } = await supabase.auth.signIn({
      email: email
    });
    // },{
    //   redirectTo: 'http://localhost:3000'
    // });
    if(error){
      alert(error.message)
      console.log(error, user, session)
    }else{
      document.getElementById('waitingForEmailToBeSentIndicator').style.display = 'none';
      document.getElementById('emailSentIndicator').style.display = 'block'
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
      <form id="loginInNavbar" on:submit|preventDefault={signIn}> 
        <input type="text" class="textForm navForm" placeholder="Email address" required="required"  bind:value={email}>
        <button id="loginButton" class="buttonAuth" type="submit">Sign in</button>
        <button on:click={()=>window.location.href ='/auth'} id="alternativeButton" class="buttonAuth">Sign in</button>
      </form>
      <div id="waitingForEmailToBeSentIndicator"><Jumper size="40" color="#f2b3cf" unit="px" duration="1s"></Jumper></div>
      <p id="emailSentIndicator">Email sent!</p>
    {/if}
  </div>
</nav>

<style>
  #emailSentIndicator, #waitingForEmailToBeSentIndicator{
    display: none;
  }
</style>
