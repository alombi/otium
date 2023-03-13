<script>
    export let id, DB, friends, title, totalPages, userID;
    import { addToBookshelf, removeFromBookshelf, toggleStar } from '$lib/books';
    import { isAdded, bookshelfTag, isStarred, progress, pagesRead } from '$lib/stores.js';
    import ActionsModal from './ActionsModal.svelte';
    import { Send, Star, StarOff, Tag, Trash2 } from 'lucide-svelte';
    import SuggestModal from './SuggestModal.svelte';
 
    async function invokeAddToBookshelf(id, tag){
        let response = await addToBookshelf(id, tag, $isStarred, userID)
        if(response){
            alert(response.message)
        }else{
            // addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
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
            // addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
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
            // addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
            isStarred.set(!$isStarred)
        }
    }
 
    function invokeSuggest(id){
        // openModal(SuggestModal, { title: "Suggest book", friends:friends, bookTitle:title, type:'suggestion', userID: userID })
        const dialog = document.querySelector('#suggestModal');
        dialog.setAttribute("open", "true")
    }
    function openActionsModal(){
        const dialog = document.querySelector('#actionsModal');
        dialog.setAttribute("open", "true")
    }
 </script>
 
<div id="buttons_grid_container">
    <div class="grid">
    <button on:click={invokeSuggest(id)} class="book-actions share"><span class="text-icon"><Send /></span> Suggest to a friend</button>
    {#if DB}
        <button class="book-actions edit" on:click={openActionsModal}><span class="text-icon"><Tag /></span> Edit tag</button>
        {#if $isStarred == false}
            <button class="book-actions favorite" on:click={invokeToggleStar(id)}><span class="text-icon"><Star /></span> Star as favorite</button>
        {/if}
        {#if $isStarred == true}
            <button class="book-actions favorite" on:click={invokeToggleStar(id)}><span class="text-icon"><StarOff /></span> Unstar</button>
        {/if}
        <button class="book-actions remove" on:click={invokeRemoveFromBookshelf(id)}><span class="text-icon"><Trash2 /></span> Remove book</button>
    {:else}
        <button class="book-actions add" on:click={invokeAddToBookshelf(id, 'unset')}><i class="fas fa-plus"></i> Add to bookshelf</button>
    {/if}
    </div>
</div>
<ActionsModal tag={$bookshelfTag} {userID} {id} {totalPages} />
<SuggestModal {friends} {userID} bookTitle={title}/>

 <style>
     .special{
         margin-bottom:10px;
     }
 </style>