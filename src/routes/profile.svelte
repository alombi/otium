<script context="module">
   import supabase from '$lib/db';
   export async function load(){
      const session = supabase.auth.session();
      let id;
      let data;
      if(session != null){
         id = session.user.id
         data = await supabase.from('profiles').select('*').eq('id', id)
      }else{
         data = null
      }
      return {props:{data}}
   }
</script>

<script>
   import { session } from '$app/stores';
   import LoggedOutProfile from '$components/LoggedOutProfile.svelte';
   import Banner from '$components/Banner.svelte';
   import { onMount } from 'svelte';
   export let data;
   async function changeUsername(){
      let id = data[0].id
      document.getElementById('bannerInput').disabled = 'true';
      document.getElementById('ready').disabled = 'true';
      let username = document.getElementById('bannerInput').value;
      const { data2, error2 } = await supabase.from('profiles').update({'username':username }).eq('id', id)
      if(error2){
         alert(error2.message)
      }else{
         document.getElementsByClassName('banner')[0].style.display = 'none';
         name = username;
      }
   }

   let name;
   let usernameMissing = true;
   onMount(()=>{
      if($session && data){
         if(data[0].username == undefined || data[0].username == ''){
            name = data[0].id
         }else{
            name = data[0].username;
            usernameMissing = false;
         }
      }
   })
   
   
   async function loading(){
      setTimeout(() => {
         
      }, 500);
   }
   let loaded = loading()
</script>

{#await loaded}
   <div></div>
{:then}
   {#if $session}
      <h1>Welcome back {name}!</h1>
      {#if usernameMissing}
         <Banner desc="Complete your profile by creating an username" button="Create" func={()=>changeUsername()} advancedTitle="Create username"/>
      {/if}
      
   {:else}
      <LoggedOutProfile />
   {/if}
{/await}
