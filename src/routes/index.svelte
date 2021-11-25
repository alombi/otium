<script>
   import { session } from '$app/stores';

   let searchTerm;
  function search(){
    const url = '/search?q=' + searchTerm;
    window.location.href = url;
  }
</script>


<!-- <div class="content">
   {#if !$session}
      <div class="centered-welcome">
            <div>
               <h2>Welcome back!</h2>
               <p>Select an option or search a book from the sidebar to get started</p>
               <form class="searchBar-alt" on:submit|preventDefault={search}>
                  <input type="text" class="textForm" placeholder="Search per title" required="required" bind:value={searchTerm}>
                  <button id="searchButton" type="submit"><i class="fas fa-search"></i></button>
               </form>
            </div>
      </div>
   {:else}
      <h1>Welcome to Otium!</h1>
      <p>Otium is a free and open source bookshelf organizer, that helps you managing your books and the ones you would like to read.</p>
      <h2>Getting started</h2>
      <p>Ready to begin? Just insert your email and tap <b>Sign in</b>. In a few moments you'll receive an email containing a link, that will log you in into your new account!</p>
      <p>Whenever you want to access your account, just fill in your email and tap on the link that will be sent you.</p>
   {/if}
</div> -->


<style>
   .centered-welcome{
      display: flex;
      align-items: center;
      justify-content: center;
      height:calc(100vh - 150px);
      overflow-y: hidden;
      margin:0;
   }
   .centered-welcome h2, .centered-welcome p{
      opacity: 0.3;
   }
   .centered-welcome div{
      text-align: center;
   }
   .centered-welcome p{
      margin-top: -15px;
   }
   .textForm{
      max-width: 300px;
   }
</style>