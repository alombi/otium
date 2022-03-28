<script>
   import { closeModal } from 'svelte-modals'
   import { removeAnnotation } from '$lib/readingFlow';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   import { annotations } from '$lib/readingFlow';

   export let isOpen
   export let title
   export let containsQuote
   export let quote
   export let message
   export let annotation
   export let flow

   async function invokeRemoveAnnotation(){
      let res = await removeAnnotation(annotation, flow.id)
      console.log(res)
      if(res == 'problem'){
         addNotification({text:'Whoops! Something went wrong.', position:'bottom-right', type:'danger', removeAfter: '2000'})
      }else{
         closeModal()
         annotations.set(res)
         addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
      }
   }
</script>

{#if isOpen}
 <div role="dialog" class="modal">
   <div class="contents">
      <h2>{title}</h2>
         {#if containsQuote}
            <p class="quote">{quote}</p>
         {/if}
       <div class="content_container">
         <p>{message}</p>
      </div>
       <div class="actions">
         <button class="buttonAuth remove" on:click={invokeRemoveAnnotation}>Remove annotation</button>
         <button class="toolsButton" on:click={closeModal}>Close</button>
       </div>
   </div>
 </div>
{/if}

<style>
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
      min-width: 600px;
      max-width: 600px;
      border-radius: 6px;
      padding: 16px;
      background: #3b4252;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      pointer-events: auto;
      max-height: 65vh;
      overflow-x: scroll;
   }
   @media(max-width:550px){
      .contents{
         min-width: 90%;
         max-width: 90%;
      }
   }
   .content_container{
      max-height: 65vh;
      overflow-y: scroll;
      padding-bottom: 10px;
   }
   h2 {
      text-align: center;
      font-size: 24px;
   } 
   p {
      text-align: left;
      margin-top: 16px;
   }
   .quote{
      font-style: italic;
      opacity: 0.7;
   }
   .actions {
      margin-top: 32px;
      display: flex;
      justify-content: flex-end;
   }

</style>