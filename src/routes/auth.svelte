<!-- This page is for small devices or as an alternative to the navbar  -->
<script>
   import { session } from '$app/stores';
   import { onMount } from "svelte";
   import { Jumper } from 'svelte-loading-spinners';
   import supabase from '$lib/db';
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
      if(error){
         alert(error.message)
      }else{
         $session = supabaseSession
      }
   }


   onMount(()=>{
      if($session){
      window.location.href = '/'
      };
      document.getElementById('alternativeButton').style.display = 'none'
   })
   
</script>

const { user, supabaseSession, error } = await supabase.auth.signIn({
         email: email,
         password: password
      });
      if(error){
         alert(error.message)
      }else{
         $session = supabaseSession
      }