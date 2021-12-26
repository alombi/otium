<script>
   import { session } from '$app/stores';
   import { onMount } from "svelte";

   let searchTerm;
   function search(){
      const url = '/search?q=' + searchTerm;
      window.location.href = url;
   }
   onMount(()=>{
      if(screen.width < 750){
         document.getElementById('alternativeButton').style.display = 'inherit';
      }
   })
   async function loading(){
      setTimeout(() => {
         
      }, 1000);
   }
   let loaded = loading()
</script>


<div class="content">
   {#await loaded}
      <div></div>
   {:then}
      {#if !$session}
         <div class="centered-welcome">
            <div>
               <h2>Welcome back!</h2>
               <form class="searchBar-alt" on:submit|preventDefault={search}>
                  <input type="text" class="textForm" placeholder="Search per title" required="required" bind:value={searchTerm}>
                  <button id="searchButton" type="submit"><i class="fas fa-search"></i></button>
               </form>
               <div class="mobile-welcome">
                  <h1 class="mobile-h1">Welcome back!</h1>
               </div>
            </div>
         </div>
         <p>lista o griglia</p>
      {:else}
         <h1>Welcome to Otium!</h1>
         <p>Otium is a free and open source bookshelf organizer, that helps you managing your books and the ones you would like to read.</p>
         <h2>Getting started</h2>
         <p>Ready to begin? Just insert your email and tap <b>Sign in</b>. In a few moments you'll receive an email containing a link, that will log you in into your new account!</p>
         <p>Whenever you want to access your account, just fill in your email and tap on the link that will be sent you.</p>
      {/if}
   {/await}
</div>