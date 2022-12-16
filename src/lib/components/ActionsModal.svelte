<script>
    import { closeModal } from 'svelte-modals'
    import { changeTag, updateProgress } from '$lib/books';
    import { isAdded, bookshelfTag, isStarred, progress, pagesRead } from '$lib/stores.js';
    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();
    export let isOpen
    export let tag, userID, id, totalPages

    async function invokeChangeTag(id, tag){
        let response = await changeTag(id, tag, userID)
        closeModal()
        if(response){
            alert(response.message)
        }else{
            addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
            isAdded.set(false)
            bookshelfTag.set(tag)
        }
    }
    async function invokeUpdateProgress(id){
        let newProgress = window.prompt('How many pages have you read?', $pagesRead)
        closeModal()
        if(newProgress && !isNaN(newProgress)){
            let response = await updateProgress(id, newProgress, totalPages, userID)
            if(response){
            alert(response.message)
            }else{
                $pagesRead = newProgress
                addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
            }
        }
        
    }

</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
        <h2>Change book's tag</h2>
        {#if tag == 'reading'}
            <button class="book-actions reading" on:click={invokeUpdateProgress(id)}><i class="fa-solid fa-percent"></i> Update progress</button>
        {/if}
        {#if tag != 'read'}
            <button class="book-actions read revert" on:click={invokeChangeTag(id, 'read')}><i class="fa-regular fa-check"></i> Mark as read</button>
        {/if}
        {#if tag != 'reading'}
            <button class="book-actions reading" on:click={invokeChangeTag(id, 'reading')}><i class="fa-solid fa-book-bookmark"></i> Mark as reading</button>
        {/if}
        {#if tag != 'to_read'}
            <button class="book-actions to_read" on:click={invokeChangeTag(id, 'to_read')}><i class="fa-regular fa-clock"></i> Mark to read</button>
        {/if}
        {#if tag != 'unset'}
            <button class="book-actions untag" on:click={invokeChangeTag(id, 'unset')}><i class="fa-solid fa-xmark"></i> Remove tag</button>
        {/if}
        <div class="actions">
            <button class="toolsButton" on:click={closeModal}>Cancel</button>
        </div>
    </div>
  </div>
 {/if}
 
 <style>
  button{
    margin-bottom: 5px;
  }
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
 
    /* allow click-through to backdrop */
    pointer-events: none;
  } 
  @media(max-width:550px){
    .modal{
      left:0;
    }
  }
  .contents {
    min-width: 240px;
    border-radius: 6px;
    padding: 16px;
    background: #3b4252;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
  }
  h2 {
    text-align: center;
    font-size: 24px;
  } 
  p {
    text-align: center;
    margin-top: 16px;
  }
  .actions {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }
 </style>