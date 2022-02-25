<!-- This page is for small devices or as an alternative to the navbar  -->
<script>
   import { session } from '$app/stores';
   import { onMount } from "svelte";
   import { Jumper } from 'svelte-loading-spinners';
   import supabase from '$lib/db';
   let email;
   async function signIn(){
      document.getElementById('loginFromPage').style.display = 'none';
      document.getElementById('waitingForEmailToBeSentIndicatorFromAuth').style.display = 'flex';
      document.getElementById('waitingForEmailToBeSentIndicatorFromAuth').style.justifyContent = 'center';
      document.getElementById('loginButton').disabled = 'true';
      const { user, session, error } = await supabase.auth.signIn({
         email: email
      },{
         redirectTo:'https://otium.vercel.app/#fromauth'
      });
      if(error){
         alert(error.message)
      }else{
         document.getElementById('waitingForEmailToBeSentIndicatorFromAuth').style.display = 'none';
         document.getElementById('emailSentIndicatorFromAuth').style.display = 'block'
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
   <p>Fill in your email address to login or signup!</p>
   <br>
   <form class="" on:submit|preventDefault={signIn}> 
      <input type="text" class="textForm" placeholder="Email address" required="required" bind:value={email}>
      <button class="buttonAuth" type="submit">Sign in</button>
   </form>
   <br>
   <p>An email with a magic link be sent to your inbox: just open that link and you'll be logged into Otium!</p>
   <p>Your email won't be shared with anyone.</p>
</div>
<div id="waitingForEmailToBeSentIndicatorFromAuth" class="loader"><Jumper size="120" color="#f2b3cf" unit="px" duration="1s"></Jumper></div>
<h1 style="text-align: center;" id="emailSentIndicatorFromAuth">Email sent!</h1>


<style>
   form{
      text-align: center;
   }
   #emailSentIndicatorFromAuth, #waitingForEmailToBeSentIndicatorFromAuth{
     display: none;
   }
 </style>