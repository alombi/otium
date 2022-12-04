<script>
   export let id, DB, friends, title, totalPages, userID;
   import { addToBookshelf, removeFromBookshelf, toggleStar } from '$lib/books';
   import { isAdded, bookshelfTag, isStarred, progress, pagesRead } from '$lib/stores.js';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   import { openModal } from 'svelte-modals'
   import ActionsModal from './ActionsModal.svelte';
   import SuggestModal from './SuggestModal.svelte';

    async function invokeAddToBookshelf(id, tag){
        let response = await addToBookshelf(id, tag, $isStarred, userID)
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
        let response = await removeFromBookshelf(id, userID)
        if(response){
            alert(response.message)
        }else{
            addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
            isAdded.set(false)
            bookshelfTag.set(undefined)
            DB = false
        }
    }
    async function invokeToggleStar(id){
        let response = await toggleStar(id, userID)
        if(response){
            alert(response.message)
        }else{
            addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
            isStarred.set(!$isStarred)
        }
    }

    function invokeSuggest(id){
        openModal(SuggestModal, { title: "Suggest book", friends:friends, bookTitle:title, type:'suggestion', userID: userID })
    }
    function openActionsModal(){
        openModal(ActionsModal, { tag: $bookshelfTag, userID:userID, id:id, totalPages:totalPages })
    }
</script>

<div id="buttons_grid_container">
   <div class="buttons-container">
   <button on:click={invokeSuggest(id)} class="book-actions share floating desktop"><i class="fa-solid fa-share-from-square"></i> Suggest to a friend</button>
   <button on:click={invokeSuggest(id)} class="book-actions share mobile"><i class="fa-solid fa-share-from-square"></i> Suggest to a friend</button>
    {#if DB}
        <button class="book-actions edit" on:click={openActionsModal}><i class="fa-solid fa-tag"></i> Edit tag</button>
        {#if $isStarred == false}
            <button class="book-actions favorite" on:click={invokeToggleStar(id)}><i class="fa-regular fa-star"></i> Star as favorite</button>
        {/if}
        {#if $isStarred == true}
            <button class="book-actions favorite" on:click={invokeToggleStar(id)}><i class="fa-regular fa-star"></i> Unstar</button>
        {/if}
        <button class="book-actions remove" on:click={invokeRemoveFromBookshelf(id)}><i class="fas fa-trash-alt"></i> Remove book</button>
    {:else}
        <button class="book-actions add" on:click={invokeAddToBookshelf(id, 'unset')}><i class="fas fa-plus"></i> Add to bookshelf</button>
    {/if}
   </div>
</div>

<style>
    .special{
        margin-bottom:10px;
    }
</style>