<script>
    import { closeModal } from 'svelte-modals'

    export let isOpen
    export let title
    export let message
    export let showButtons
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
        <h2>{title}</h2>
        <p>{message}</p>
      {#if showButtons}
        <div class="actions">
          <button class="toolsButton" on:click={closeModal}>Close</button>
        </div>
      {/if}
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