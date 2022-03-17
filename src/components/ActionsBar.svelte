<script>
   export let id;
   export let DB;
   import { addToBookshelf, removeFromBookshelf, changeTag, toggleStar } from '$lib/books';
   import { getNotificationsContext } from 'svelte-notifications';
   import { isAdded, bookshelfTag, isStarred } from '$lib/tag_store';
   const { addNotification } = getNotificationsContext();

   async function invokeAddToBookshelf(id, tag){
      let response = await addToBookshelf(id, tag, $isStarred)
      if(response){
         alert(response.message)
      }else{
         addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
         isAdded.set(true)
         bookshelfTag.set('unset')
         DB = true
      }
   } 
   async function invokeRemoveFromBookshelf(id){
      let response = await removeFromBookshelf(id)
      if(response){
         alert(response.message)
      }else{
         addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
         isAdded.set(false)
         bookshelfTag.set(undefined)
         DB = false
      }
   }

   async function invokeChangeTag(id, tag){
      let response = await changeTag(id, tag)
      if(response){
         alert(response.message)
      }else{
         addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
         isAdded.set(false)
         bookshelfTag.set(tag)
         DB = true
      }
   }

   async function invokeToggleStar(id){
      let response = await toggleStar(id)
      if(response){
         alert(response.message)
      }else{
         addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
         isStarred.set(!$isStarred)
      }
   }
</script>
<div class="buttons-container">
   {#if DB}
      {#if $bookshelfTag != 'unset'}
         <button class="book-actions untag" on:click={invokeChangeTag(id, 'unset')}><i class="fas fa-tag"></i> Remove tag</button>
      {/if}
      {#if $bookshelfTag != 'read'}
         <button class="book-actions read revert" on:click={invokeChangeTag(id, 'read')}><i class="fas fa-check"></i> Mark as read</button>
      {/if}
      {#if $bookshelfTag != 'reading'}
         <button class="book-actions reading" on:click={invokeChangeTag(id, 'reading')}><i class="fas fa-bookmark"></i> Mark as reading now</button>
      {/if}
      {#if $bookshelfTag != 'to_read'}
         <button class="book-actions to_read" on:click={invokeChangeTag(id, 'to_read')}><i class="fas fa-clock"></i> Mark to read</button>
      {/if}
      {#if $isStarred == false}
         <button class="book-actions favorite" on:click={invokeToggleStar(id)}><i class="fas fa-star"></i> Star as favorite</button>
      {/if}
      {#if $isStarred == true}
         <button class="book-actions favorite" on:click={invokeToggleStar(id)}><i class="fas fa-star"></i> Unstar</button>
      {/if}
      <button class="book-actions remove" on:click={invokeRemoveFromBookshelf(id)}><i class="fas fa-trash-alt"></i> Remove book</button>
   {:else}
      <button class="book-actions add" on:click={invokeAddToBookshelf(id, 'unset')}><i class="fas fa-plus"></i> Add to bookshelf</button>
      <!-- <button class="book-actions share"><i class="fas fa-share"></i> Suggest to a friend</button> -->
   {/if}
</div>