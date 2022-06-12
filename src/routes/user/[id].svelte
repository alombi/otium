<script context="module">
   import supabase from '$lib/db';
   export async function load({params}){
      const id = params.id
      const session = await supabase.auth.session()
      let userID
      try{
         userID = session.user.id;
      }catch{}
      const { data, error } = await supabase.from('profiles').select('*').eq('id', id)
      let user = await supabase.from('profiles').select('*').eq('id', userID)
      user = user.data
      let friends = [];
      let friendship = await supabase.from('friendship').select('*');
      friendship = friendship.data;
      friendship.filter(function (e){
         if(e.sender_id == id || e.receiver_id == id){
            if(e.status != 'declined'){
               friends.push(e)
            }
         }
      })
      let isFriend = false;
      friends.forEach(friend =>{
         try{
            if(session.user.id === friend.sender_id || session.user.id === friend.receiver_id){
               if(friend.status != 'declined'){
                  isFriend = true
               }
            }
         }catch{}
      })
      return {props:{data, id, friends, isFriend, user}}
   }
</script>

<script>
   import { makeUserStats } from '$lib/userActions';
   import { sendFriendRequest } from '$lib/userActions';
   import { Jellyfish } from 'svelte-loading-spinners'
   import StatsBar from '$components/StatsBar.svelte';
   import Shelf from '$components/Shelf.svelte';
   import Switcher from '$components/Switcher.svelte';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   import { openModal } from 'svelte-modals'
   import Modal from '$components/Modal.svelte';

   export let data, id, isFriend;
   export let friends;
   export let user;
   $:value = "Reading";
   let stats;
   async function loading(){
      stats = await makeUserStats(data)
      
   }
   let loaded = loading()

   async function invokeSendFriendRequest(){
      if(user[0].username){
         let res = await sendFriendRequest(id)
         if(res){
            alert(res.message)
         }else{
            addNotification({text:'Sent!', position:'bottom-right', type:'success', removeAfter: '2000'})
            document.getElementById('friendButton').style.display = 'none';
         }
      }else{
         openModal(Modal, {title:"Whoops! Something went wrong", message:"Please create an username in your profile page before using social features!", showButtons:true})
      }
   }
   friends.forEach(friend => {
      if(id != friend.receiver_id){
         friend.friendName = friend.receiver_name
         friend.friendURL = `/user/${friend.receiver_id}`
      }else{
         friend.friendName = friend.sender_name
         friend.friendURL = `/user/${friend.sender_id}`
      }
   });
</script>

<svelte:head>
   {#if data[0].username}
      <title>Otium | {data[0].username}</title>
   {:else}
      <title>Otium | User {data[0].id.split('-')[0]}</title>
   {/if}
</svelte:head>

<div id="loading-loader" class="loader"><Jellyfish size="120" color="#f2b3cf" unit="px" duration="1s"></Jellyfish></div>
{#await loaded}
   <div></div>
{:then}
   <div class="content">
      <div>
         <div id="buttonContainer">
            {#if data[0].username}<h1>{data[0].username}</h1>{:else}<h1>User {data[0].id.split('-')[0]}</h1>{/if}
            <p>{#if !isFriend}<button id="friendButton" on:click|preventDefault={invokeSendFriendRequest}>Ask friendship</button>{/if}</p>
         </div>
         <StatsBar stats={stats} />
      </div>
      <h2>Friends</h2>
      {#if friends.length == 0}
         <p class="not_found">No friends yet!</p>
      {:else}
         <div class="friends">
         {#each friends as friend}
            {#if friend.status != 'declined'}
               <div class="friend">
                  <a href={friend.friendURL} target="_parent"><p>{friend.friendName}</p></a>
                  {#if friend.pending}
                     <p id="pending">Pending</p>
                  {/if}
               </div>
            {/if}
         {/each}
         </div>
      {/if}
      
      <h2>Bookshelf</h2>
      <Switcher items={['Reading', 'To Read', 'Read', 'Starred'].map((i) => ({ l: `${i}`, v: i }))} bind:value/>
      <br>
      <Shelf id={id} tag={value.toLowerCase().replace(' ', '_')} />
   </div>
{/await}

<style>
   .content{
      display:none
   }
</style>