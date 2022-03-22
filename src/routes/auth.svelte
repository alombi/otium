<script>
   import { session } from '$app/stores';
   import { onMount } from "svelte";
   import supabase from '$lib/db';
   import { Jumper } from 'svelte-loading-spinners'
   import { openModal } from 'svelte-modals'
   import Modal from '$components/Modal.svelte';
   let email, password;
   let isSent = false;
   async function signIn(){
      if(!isSent){
         document.getElementById('waitingForEmailToBeSentIndicatorFromAuth').style.display = 'flex';
         document.getElementById('waitingForEmailToBeSentIndicatorFromAuth').style.justifyContent = 'center';
         document.getElementById('loginFromPage').style.display = 'none';
         const { user, supabaseSession, error } = await supabase.auth.signIn({
            email: email,
            password: password
         });
         if(error){
            console.log(error.message)
            document.getElementById('waitingForEmailToBeSentIndicatorFromAuth').style.display = 'none';
            document.getElementById('loginFromPage').style.display = 'block';
            openModal(Modal, {title:"Whoops!", message:`An error occurred: ${error.message}`, showButtons:true})
         }else{
            if(supabaseSession){
               session.set(supabaseSession)
               document.location.href = '/'
            }
         }
      }
   }
   isSent = false


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
   <br>
   <p>New to Otium? <a href="/signup">Create an account!</a></p>
</div>
<div id="waitingForEmailToBeSentIndicatorFromAuth" class="loader"><Jumper size="120" color="#f2b3cf" unit="px" duration="1s"></Jumper></div>

<style>
   form{
      text-align: center;
   }
   #waitingForEmailToBeSentIndicatorFromAuth{
      display: none;
   }
 </style>