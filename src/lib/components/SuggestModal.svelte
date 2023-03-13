<script>
    export let friends, userID, bookTitle
    import { sendNotification } from '$lib/userActions.js';
    import { X } from 'lucide-svelte';
    async function suggest(friend){
        let link = window.location.pathname
        let content = `${userID} suggested you a book: <i>${bookTitle}</i>!`
        let suggestion = await sendNotification(friend.friendID, content, link, 'suggestion')
        if(suggestion){
            closeModal()
        }else{
            closeModal()
        }
    }
    function closeModal(){
        const dialog = document.querySelector('#suggestModal');
        dialog.removeAttribute("open")
    }
</script>


<dialog id="suggestModal">
    <article>
        <div class="modal-header">
            <h3>Suggest book.</h3>
            <a href="#" on:click={closeModal} style="color:unset;"><span class="icon"><X /></span></a>
        </div>
        {#if friends.length > 0}
            {#each friends as friend}
                <button on:click={suggest(friend)}>{friend.friendName}</button>
            {/each}
        {:else}
            <p>You don't have any friends yet.</p>
        {/if}      
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
    .modal-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>