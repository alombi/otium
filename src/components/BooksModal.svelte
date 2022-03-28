<script>
   import { closeModal, openModal } from 'svelte-modals'
   import Modal from '$components/Modal.svelte';
   import { createReadingFlow } from '$lib/readingFlow';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
  
   // provided by <Modals />
   export let isOpen
  
   export let title
   export let books

   async function create(book){
      //let title = `${book.title}, by ${book.author}`
      console.log(book)
      let req = await createReadingFlow(book.id, book.title)
      console.log()
      if(req.res == 'already created'){
         closeModal()
         openModal(Modal, {title:"Flow already created!", message:"Looks like you already have a flow for this book!", showButtons:true})
      }else{
         if(req.res.error){
            closeModal()
            addNotification({text:'Whoops! Something went wrong.', position:'bottom-right', type:'danger', removeAfter: '2000'})
         }else{
            closeModal()
            document.getElementById('real-page').style.display = 'none';
            document.getElementById('waitingForBookshelfPageToBeOpened').style.display = 'flex';
            let id = req.flow.data[0].id
            let url = `/reading-flow/${id}`
            window.location.href = url
         }
      }
   }
  </script>
  
 {#if isOpen}
   <div role="dialog" class="modal">
     <div class="contents">
       <h2>{title}</h2>
       <div class="friend_element_container">
         {#if books.length > 0}
           {#each books as book}
             <p  class="friend_element">
               <span>{book.title}</span>
               <button on:click={create(book)} class="toolsButton">Create</button>
             </p>
           {/each}
         {:else}
           <p>No books with "Reading" tag!</p>
         {/if}
       </div>
       <div class="actions">
         <button class="toolsButton" on:click={closeModal}>Close</button>
       </div>
     </div>
   </div>
  {/if}
  
  <style>
   .toolsButton:hover{
      opacity: 0.7;
   } 
   span{
      color:#D5F6FB
   }
   .friend_element{
      gap:7px;
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
   max-height: 75vh;
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