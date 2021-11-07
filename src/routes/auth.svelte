<!-- This page is for small devices or as an alternative to the navbar  -->
<script>
   import { session } from '$app/stores';
   import { onMount } from "svelte";
   let email;
   async function signIn(){
      const { user, session, error } = await supabase.auth.signIn({
         email: email
      })
      if(error){
         alert(error.message)
      }
   }


   onMount(()=>{
      if($session){
      window.location.href = '/'
      };
      document.getElementById('alternativeButton').style.display = 'none'
   })
   
</script>

<h1>Login</h1>
<form class="" on:submit|preventDefault={signIn}> 
   <input type="text" class="textForm" placeholder="Email address" required="required" bind:value={email}>
   <button class="buttonAuth" type="submit">Sign in</button>
</form>