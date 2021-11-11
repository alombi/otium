<script>
   import { session } from '$app/stores';
</script>


<div class="content">
   {#if $session}
      <h1>Hello from Otium</h1>
   {:else}
      <h1>Welcome to Otium!</h1>
      <!-- <p>Otium is a free and open source bookshelf organizer, that helps you managing your books and the ones you would like to read.</p>
      <h2>Getting started</h2>
      <p>Ready to begin? Just insert your email and tap <b>Sign in</b>. In a few moments you'll receive an email containing a link, that will log you in into your new account!</p>
      <p>Whenever you want to access your account, just fill in your email and tap on the link that will be sent you.</p> -->

   {/if}
</div>