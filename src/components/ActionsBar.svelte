<script>
   export let id;
   export let DB;
   export let friends;
   export let title;
   export let totalPages;
   import { addToBookshelf, removeFromBookshelf, changeTag, toggleStar, updateProgress } from '$lib/books';
   import { isAdded, bookshelfTag, isStarred, progress, pagesRead } from '$lib/tag_store';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   import { openModal } from 'svelte-modals'
   import SuggestModal from '$components/SuggestModal.svelte';

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

   function invokeSuggest(id){
      openModal(SuggestModal, { title: "Suggest book", friends:friends, bookTitle:title, type:'suggestion' })
   }

   async function invokeUpdateProgress(id){
      let newProgress = window.prompt('How many pages have you read?', $pagesRead)
      if(newProgress && !isNaN(newProgress)){
         let response = await updateProgress(id, newProgress, totalPages)
         if(response){
            alert(response.message)
         }else{
            $pagesRead = newProgress
            addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
         }
      }
   }
</script>

<div id="buttons_grid_container">
   <div class="buttons-container">
   <button on:click={invokeSuggest(id)} class="book-actions share floating desktop"><i class="fa-solid fa-share-from-square"></i> Suggest to a friend</button>
   <button on:click={invokeSuggest(id)} class="book-actions share mobile"><i class="fa-solid fa-share-from-square"></i> Suggest to a friend</button>
      {#if DB}
         {#if $bookshelfTag == 'reading'}
            <button class="book-actions reading" on:click={invokeUpdateProgress(id)}><i class="fa-solid fa-percent"></i> Update progress</button>
         {/if}
         {#if $bookshelfTag != 'unset'}
            <button class="book-actions untag" on:click={invokeChangeTag(id, 'unset')}><i class="fa-solid fa-tag"></i> Remove tag</button>
         {/if}
         {#if $bookshelfTag != 'read'}
            <button class="book-actions read revert" on:click={invokeChangeTag(id, 'read')}><i class="fa-regular fa-check"></i> Mark as read</button>
         {/if}
         {#if $bookshelfTag != 'reading'}
            <button class="book-actions reading" on:click={invokeChangeTag(id, 'reading')}><i class="fa-solid fa-book-bookmark"></i> Mark as reading</button>
         {/if}
         {#if $bookshelfTag != 'to_read'}
            <button class="book-actions to_read" on:click={invokeChangeTag(id, 'to_read')}><i class="fa-regular fa-clock"></i> Mark to read</button>
         {/if}
         {#if $isStarred == false}
            <button class="book-actions favorite" on:click={invokeToggleStar(id)}><i class="fa-regular fa-star"></i> Star as favorite</button>
         {/if}
         {#if $isStarred == true}
            <button class="book-actions favorite" on:click={invokeToggleStar(id)}><i class="fa-regular fa-star"></i> Unstar</button>
         {/if}
         <button class="book-actions remove" on:click={invokeRemoveFromBookshelf(id)}><i class="fas fa-trash-alt"></i> Remove book</button>
      {:else}
         <button class="book-actions add" on:click={invokeAddToBookshelf(id, 'unset')}><i class="fas fa-plus"></i> Add to bookshelf</button>
         <!-- <button class="book-actions share"><i class="fas fa-share"></i> Suggest to a friend</button> -->
      {/if}
   </div>
</div>

<style>
   .special{
      margin-bottom:10px;
   }
</style>