<!-- This page is for small devices or as an alternative to the navbar  -->
<script>
   import { session } from '$app/stores';
   import { onMount } from "svelte";
   import supabase from '$lib/db';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();

   let email, password;
   async function signIn(){
      //document.getElementById('loginFromPage').style.display = 'none';
      //document.getElementById('waitingForEmailToBeSentIndicatorFromAuth').style.display = 'flex';
      //document.getElementById('waitingForEmailToBeSentIndicatorFromAuth').style.justifyContent = 'center';
      //document.getElementById('loginButton').disabled = 'true';
      const { user, supabaseSession, error } = await supabase.auth.signIn({
         email: email,
         password: password
      });
      document.getElementById('waiting').style.display = 'fixed'
      if(error){
         console.log(error.message)
      }else{
         session.set(supabaseSession)
         window.location.href = '/';
      }
   }


   onMount(()=>{
      if($session){
      window.location.href = '/'
      };
      document.getElementById('alternativeButton').style.display = 'none'
   })
   
</script>

<div id="loginFromPage">
   <h1>Login</h1>
   <form class="" on:submit|preventDefault={signIn}> 
      <input type="email" class="textForm" placeholder="Email address" required="required" bind:value={email}>
      <input type="password" class="textForm" placeholder="Password" required="required" bind:value={password}>
      <button class="buttonAuth" type="submit">Sign in</button>
   </form>
</div>

<style>
   form{
      text-align: center;
   }
   #waiting{
        position: none;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0,0,0,0.50)
    }
 </style>