<script>
   import { isInFriendsBookshelf } from "$lib/books";
   import { onMount } from "svelte";
   export let friends = [];
   export let id;
   export let bookshelf;
   let commonBookFriends = [];
   const tags = {
         unset: 'Added to bookshelf',
         read: 'Read',
         to_read: 'Marked as to read',
         reading: 'Reading now'
      }
   async function seeCommon(){
      commonBookFriends = await isInFriendsBookshelf(friends, id)
      if(document.getElementById('results_container').style.display == 'flex'){
         document.getElementById('results_container').style.display = 'none'
      }else{
         document.getElementById('results_container').style.display = 'flex'
      }
   }
   onMount(async()=>{
      commonBookFriends = await isInFriendsBookshelf(friends, id, bookshelf)
   })

   let promise;
   setTimeout(()=>{
      promise = 's'
   }, 1000)
</script>

{#await promise}
   <p>no</p>
{:then}
   {#if commonBookFriends.length > 0}
   <h3 on:click={seeCommon} id="in_friends_bookshelf"><i class="fa-solid fa-user-group"></i> {commonBookFriends.length}</h3>
   <div id="results_container">
      <div id="results">
         <p class="sidebarHeader">
            <span>Friends</span>
         </p>
         {#each commonBookFriends as friend}
            <p><a href={friend.friendURL}>{friend.friendName}</a> - {tags[friend.bookTagged]}</p>
         {/each}
      </div>
   </div>
   {/if}
{/await}

<style>
   #results_container{
      padding-top: 0px;
      padding-right: 0px;
   }
</style>