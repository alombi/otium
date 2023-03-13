<script>
    import { changeTag, updateProgress } from '$lib/books';
    import { isAdded, bookshelfTag, isStarred, progress, pagesRead } from '$lib/stores.js';
    import { BookOpen, Check, Clock, Percent, X } from 'lucide-svelte';
    export let tag, userID, id, totalPages
    async function invokeChangeTag(id, tag){
        let response = await changeTag(id, tag, userID)
        closeModal()
        if(response){
            alert(response.message)
        }else{
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
            }
        }
        
    }
    function closeModal(){
        const dialog = document.querySelector('#actionsModal');
        dialog.removeAttribute("open")
    }
</script>


<dialog id="actionsModal">
    <article>
      <h3>Change book's tag.</h3>
            {#if tag == 'reading'}
                <button class="book-actions reading" on:click={invokeUpdateProgress(id)}><span class="text-icon"><Percent /></span> Update progress</button>
            {/if}
            {#if tag != 'read'}
                <button class="book-actions read revert" on:click={invokeChangeTag(id, 'read')}><span class="text-icon"><Check /></span> Mark as read</button>
            {/if}
            {#if tag != 'reading'}
                <button class="book-actions reading" on:click={invokeChangeTag(id, 'reading')}><span class="text-icon"><BookOpen /></span>Mark as reading</button>
            {/if}
            {#if tag != 'to_read'}
                <button class="book-actions to_read" on:click={invokeChangeTag(id, 'to_read')}><span class="text-icon"><Clock /></span> Mark to read</button>
            {/if}
            {#if tag != 'unset'}
                <button class="book-actions untag" on:click={invokeChangeTag(id, 'unset')}><span class="text-icon"><X /></span> Remove tag</button>
            {/if}
      <footer>
        <button class="toolsButton" on:click={closeModal}>Cancel</button>
      </footer>
    </article>
</dialog>


<style>
    article{
        min-width:100%;
    }
    @media only screen and (min-width: 768px) {
        article{
            min-width:50%;
        }
    }
    .book-actions{
        padding-top: 8px;
        padding-bottom: 7px;
        font-size: 17px;
    }
</style>