<script context="module">
   import supabase from '$lib/db';
   export async function load(){
      const session = supabase.auth.session();
      let id;
      let data, profiles, friendship;
      let friends = []
      try{
         id = session.user.id
         data = await supabase.from('profiles').select('*').eq('id', id)
         data = data.data

         profiles = await supabase.from('profiles').select('*');
         profiles = profiles.data

         friendship = await supabase.from('friendship').select('*');
         friendship = friendship.data;
         friendship.filter(function (e){
            if(e.sender_id == id || e.receiver_id == id){
               if(e.status != 'declined'){
                  friends.push(e)
               }
            }
         })
      }catch{
         data = null
      }
      return {props:{data, profiles, friends, id}}
   }
</script>

<svelte:head>
   <title>Otium | Social</title>
</svelte:head>

<script>
   import { session } from '$app/stores';
   import { onMount } from 'svelte';
   import { changeUsernameServer, makeUserStats, answerFriendRequest } from '$lib/userActions.js';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   import LoggedOutProfile from '$components/LoggedOutProfile.svelte';
   import Banner from '$components/Banner.svelte';
   import StatsBar from '$components/StatsBar.svelte';
   import { Jellyfish } from 'svelte-loading-spinners';
   
   export let data, profiles, friends, id;

   async function changeUsername(){
      let id = data[0].id
      document.getElementById('bannerInput').disabled = 'true';
      document.getElementById('ready').disabled = 'true';
      let username = document.getElementById('bannerInput').value;
      let result = await changeUsernameServer(username, id)
      if(result){
         alert(result.message)
      }else{
         document.getElementsByClassName('banner')[0].style.display = 'none';
         name = username;
      }
   }
   let searchTerm;
   let results = [];
   let searchRes = [];
   function search(){
      let usernames = [];
      profiles.forEach(profile => { usernames.push(profile.username) });
      usernames.forEach(username =>{
         if(username.indexOf(searchTerm) != -1){
            var obj = {
               name: username
            }
            profiles.forEach(profile =>{ if(profile.username == username){obj.url = '/user/' + profile.id} })
            results.push(obj)
         }
      })
      if(results.length > 0){
         document.getElementById('results').style.display = 'block'
         addNotification({text:`Found ${results.length} results`, position:'bottom-right', type:'success', removeAfter: '2000'})
         searchRes = results
      }else{
         addNotification({text:'No results', position:'bottom-right', type:'danger', removeAfter: '2000'})
      }
      results = []
   }

   let name;
   let usernameMissing = true;
   onMount(()=>{
      document.getElementById('real-page').style.display = 'block';
      document.getElementById('waitingForBookshelfPageToBeOpened').style.display = 'none';
      if($session && data){
         if(data[0].username == undefined || data[0].username == ''){
            name = data[0].id
         }else{
            name = data[0].username;
            usernameMissing = false;
         }
      }
   })
   
   let stats;
   async function loading(){
      stats = await makeUserStats(data)
   }
   let loaded = loading()
   
   friends.forEach(friend => {
      if(id != friend.receiver_id){
         friend.friendName = friend.receiver_name
         friend.friendURL = `/user/${friend.receiver_id}`
      }else{
         friend.friendName = friend.sender_name
         friend.friendURL = `/user/${friend.sender_id}`
      }
   });

   async function invokeAnswerFriendRequest(isAccepted, friendship){
      let res = await answerFriendRequest(isAccepted, friendship)
      if(res){
         addNotification({text:'Something went wrong!', position:'bottom-right', type:'danger', removeAfter: '2000'})
      }else{
         document.getElementById('pending_container').style.display = 'none';
         addNotification({text:'Accepted!', position:'bottom-right', type:'success', removeAfter: '2000'})
      }
   }
</script>

{#await loaded}
   <div class="loader"><Jellyfish size="120" color="#f2b3cf" unit="px" duration="1s"></Jellyfish></div>  
{:then}
   {#if $session}
      <div id="searchBar-local">
         <form class="searchBar-alt searchBar-search-and-profile" on:submit|preventDefault={search}>
            <input type="text" class="textForm" placeholder="Search per username" required="required" bind:value={searchTerm}>
            <button id="searchButton" type="submit"><i class="fas fa-search"></i></button>
         </form>
      </div>
      <div id="results_container">
         <div id="results">
            {#each searchRes as result}
               <p><a href={result.url}>{result.name}</a></p>
            {/each}
         </div>
      </div>
      <h1>Welcome back {name}!</h1>
      {#if usernameMissing}
         <Banner desc="Complete your profile by creating an username" button="Create" func={()=>changeUsername()} advancedTitle="Create username"/>
      {/if}
      
      <StatsBar stats={stats}/>
      <h2>Friends</h2>
      {#if friends.length == 0}
         <p class="not_found">No friends yet!</p>
      {:else}
         <div class="friends">
         {#each friends as friend}
            {#if friend.status != 'declined'}
               <div class="friend">
                  <a href={friend.friendURL} target="_parent"><p>{friend.friendName}</p></a>
                  <div id="pending_container">
                     {#if friend.pending && id === friend.receiver_id}
                        <button id="friendButton" on:click={()=>{invokeAnswerFriendRequest(true, friend)}}>Accept</button>
                        <button id="friendButton" on:click={()=>{invokeAnswerFriendRequest(false, friend)}}>Decline</button>
                     {:else if friend.pending && id != friend.receiver_id}
                        <p id="pending">Pending</p>
                     {/if}
                  </div>
               </div>
            {/if}
         {/each}
         </div>
      {/if}
            
   {:else}
      <LoggedOutProfile />
   {/if}
{/await}

<style>
   #results{
      display: none;
      position: fixed;
      background-color: #2e3440;
      width: 70vw;
      max-width: 300px;
      border-radius: 4px;
      text-decoration: none;
      padding: 5px 15px;
   }
   #results p:hover{
      opacity: 0.6;
   }
   #results_container{
      display: flex;
      justify-content: center;
      padding-right: 45px;
      padding-top:5px;
   }
</style>
