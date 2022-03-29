<script>
   import { closeModal } from 'svelte-modals'
   import { loading } from '$lib/utils';
   import { archiveFlow , switchVisibility } from '$lib/readingFlow';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   import { isPublic } from '$lib/readingFlow';

   export let isOpen
   export let title
   export let flow


   async function invokeArchiveFlow(){
      let res = await archiveFlow(flow.id)
      if(res){
         closeModal()
         addNotification({text:'Whoops! Something went wrong.', position:'bottom-right', type:'danger', removeAfter: '2000'})
      }else{
         closeModal()
         loading('/reading-flow')
         window.location.href = '/reading-flow'
      }
   }
   async function invokeSwitchVisibility(){
      let res = await switchVisibility(flow.id, $isPublic)
      if(res){
         closeModal()
         addNotification({text:'Whoops! Something went wrong.', position:'bottom-right', type:'danger', removeAfter: '2000'})
      }else{
         isPublic.set(!$isPublic)
         closeModal()
         addNotification({text:'Done!', position:'bottom-right', type:'success', removeAfter: '2000'})
      }
   }
</script>

{#if isOpen}
 <div role="dialog" class="modal">
   <div class="contents">
       <h2>{title}</h2>
       <div class="buttons">
         {#if $isPublic}
            <button class="buttonAuth private" on:click={invokeSwitchVisibility}>Make private</button>
         {:else}
         <button class="buttonAuth public" on:click={invokeSwitchVisibility}>Make public</button>
         {/if}
         <br>
         <button class="buttonAuth unset" on:click={invokeArchiveFlow}>Archive flow</button>
       </div>
       <div class="actions">
         <button class="toolsButton" on:click={closeModal}>Close</button>
       </div>
   </div>
 </div>
{/if}

<style>
   .buttonAuth{
      padding-left: 50px;
      padding-right: 50px;
      margin-bottom:5px;
   }
   .buttonAuth:hover{
      opacity: 0.9;
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
      min-width: 440px;
      border-radius: 6px;
      padding: 16px;
      background: #3b4252;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      pointer-events: auto;
   }
   h2 {
      text-align: center;
      font-size: 24px;
   } 
   .actions {
      margin-top: 32px;
      display: flex;
      justify-content: flex-end;
   }
</style>