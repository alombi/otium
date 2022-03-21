<script context="module">
   import supabase from '$lib/db';
   export async function load(){
      let notifications, profiles;
      try{
         const id = supabase.auth.session().user.id
         notifications = await supabase.from('notifications').select('*').eq('user', id)
         notifications = notifications.data

         profiles = await supabase.from('profiles').select('*')
         profiles = profiles.data

         notifications.forEach(notif=>{
            if(notif.type == 'suggestion'){
               profiles.forEach(user=>{
                  if(user.username && notif.content.indexOf(user.id) != -1){
                     notif.content = notif.content.replace(user.id, `<span class="notif_username">${user.username}</span>`)
                  }
               })
            }
         })
         notifications.sort((a, b)=>{
            return a.id - b.id
         })         
         notifications = notifications.reverse()
      }catch{}
      return {props:{notifications}}
   }
</script>

<script>
   import { session } from '$app/stores';
   import LoggedOutProfile from '$components/LoggedOutProfile.svelte';
   import { onMount } from 'svelte';
   import { Jellyfish } from 'svelte-loading-spinners';
   import { markAsRead } from '$lib/userActions';
   onMount(()=>{
      document.getElementById('real-page').style.display = 'block';
      document.getElementById('waitingForBookshelfPageToBeOpened').style.display = 'none';
   })
   export let notifications;
</script>

{#if $session}
   <h1>Notifications</h1>
   {#if notifications}
   {#if notifications.length == 0}
      <p class="not_found">No notifications!</p>
   {:else}
      <div class="notifications">
         {#each notifications as notification}
            <div class="notification">
               {#if !notification.isRead}
                  <div class="bullet"></div>
               {:else}
                  <div class="bullet bullet_read"></div>
               {/if}
               <p><a on:click={markAsRead(notification.id)} class="notif_link" href={notification.link}>{@html notification.content}</a><br><span class="notif_date">{new Date(notification.created_at).getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/{new Date(notification.created_at).getMonth().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/{new Date(notification.created_at).getFullYear()} - {new Date(notification.created_at).getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{new Date(notification.created_at).getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span></p>
            </div>
         {/each}
      </div>
   {/if}
   {:else}
      <div class="loader"><Jellyfish size="120" color="#f2b3cf" unit="px" duration="1s"></Jellyfish></div>     
   {/if}
{:else}
   <LoggedOutProfile />
{/if}