<script>
    import { closeModal } from 'svelte-modals'
    // Problema 
    import { sendNotification } from '$lib/userActions.js';
    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();

    export let isOpen
    export let userID
    export let title
    export let friends
    export let bookTitle

  async function suggest(friend){
    let link = window.location.pathname
    let content = `${userID} suggested you a book: <i>${bookTitle}</i>!`
    let suggestion = await sendNotification(friend.friendID, content, link, 'suggestion')
    if(suggestion){
      closeModal()
      addNotification({text:'Whoops! Something went wrong.', position:'bottom-right', type:'danger', removeAfter: '2000'})
      console.error(suggestion)
    }else{
      closeModal()
      addNotification({text: 'Sent!', position:'bottom-right', type:'success', removeAfter: '2000'})
    }
  }
 
 </script>
 
{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      <h2>{title}</h2>
      <div class="friend_element_container">
        {#if friends.length > 0}
          {#each friends as friend}
            <p  class="friend_element">
              <span>{friend.friendName}</span>
              <button on:click={suggest(friend)} class="toolsButton">Suggest</button>
            </p>
          {/each}
        {:else}
          <p>No friends yet!</p>
        {/if}
      </div>
      <div class="actions">
        <button class="toolsButton" on:click={closeModal}>Close</button>
      </div>
    </div>
  </div>
 {/if}
 
 <style>
   span{
     color:#D5F6FB
   }
   .friend_element{
     text-align: left;
     padding:10px;
     margin-bottom: -16px;
     border-bottom:2px solid #4c566a;
     display: flex;
     justify-content: space-between;
     align-items: baseline;
     border-radius: 4px;
   }
   /* .friend_element:hover{
     background-color: #4c566a;
     
   } */
   .friend_element_container{
    max-height: 65vh;
    overflow-y: scroll;
    padding-bottom: 13px;
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