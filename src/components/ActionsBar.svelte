<script>
   export let id;
   export let DB;
   import { addToBookshelf, removeFromBookshelf } from '$lib/books';
   import { getNotificationsContext } from 'svelte-notifications';
   import { isAdded } from '$lib/tag_store';
   const { addNotification } = getNotificationsContext();
   let isStarred = false;
   
   if(DB){
      isStarred = DB[0].starred;
   }
   async function invokeAddToBookshelf(id, tag){
      let response = await addToBookshelf(id, tag, isStarred)
      if(response){
         alert(response.message)
      }else{
         addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
         DB = 'something'
         isAdded.set(true)
      }
   } 
   async function invokeRemoveFromBookshelf(id){
      let response = await removeFromBookshelf(id)
      if(response){
         alert(response.message)
      }else{
         addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
         DB = null
         isAdded.set(false)
      }
   }
</script>
<div class="buttons-container">
   {#if DB}
      <button class="book-actions read revert"><i class="fas fa-check"></i> Mark as read</button>
      <button class="book-actions favorite"><i class="fas fa-star"></i> Star as favorite</button>
      <button class="book-actions to_read"><i class="fas fa-clock"></i> Mark to read</button>
      <button class="book-actions remove" on:click={invokeRemoveFromBookshelf(id)}><i class="fas fa-trash-alt"></i> Remove book</button>
   {:else}
      <button class="book-actions add" on:click={invokeAddToBookshelf(id, 'unset')}><i class="fas fa-plus"></i> Add to bookshelf</button>
      <button class="book-actions share"><i class="fas fa-share"></i> Suggest to a friend</button>
   {/if}
</div>