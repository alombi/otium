<script context="module">
   import { getBooksByTag } from '$lib/getBooksByTag';
   async function requestBook(id){
      let request = await fetch('../api/book-' + id)
      let element = await request.json()
      return element.results
   }
   import supabase from '$lib/db';
   export async function load(){
      let bookshelf = []
      try{
         const session = supabase.auth.session()
         const userID = session.user.id
         let books = await getBooksByTag('reading', userID)
         for(let book of books){
            book = await requestBook(book.id)

            var bookFinal = {};
            if(book.volumeInfo.imageLinks){
               bookFinal.cover = book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
            } else{
               bookFinal.cover = 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png'
            };
            bookFinal.title = book.volumeInfo.title;
            bookFinal.author = book.volumeInfo.authors[0];
            bookFinal.publisher = book.volumeInfo.publisher;
            bookFinal.year = book.volumeInfo.publishedDate.split('-')[0]
            bookFinal.url = `/books/${book.id}`
            bookFinal.id = book.id
            bookshelf.push(bookFinal)
         }
      }catch{}
      bookshelf = bookshelf.reverse()
      return {props:{bookshelf}}
   }  
</script>

<script>
   import { session } from '$app/stores';
   import { onMount } from 'svelte';
   import LoggedOutProfile from '$components/LoggedOutProfile.svelte';
   import { openModal } from 'svelte-modals'
   import BooksModal from '$components/BooksModal.svelte';
   import { unarchiveFlow, getFlows, getArchivedFlows } from '$lib/readingFlow';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   import { Jumper } from 'svelte-loading-spinners'
   export let bookshelf = []
   let flows = []
   let archivedFlows = []
   async function invokeNewFlow(){
      openModal(BooksModal, {title:"Create new reading flow", books:bookshelf})
   }
   onMount(()=>{
      document.getElementById('real-page').style.display = 'block';
      document.getElementById('waitingForBookshelfPageToBeOpened').style.display = 'none'
   })
   async function invokeUnarchiveFlow(flowID){
      addNotification({text:'Unarchiving flow...', position:'bottom-right', type:'default', removeAfter:'2000'})
      let res = await unarchiveFlow(flowID)
      if(res){
         addNotification({text:'Whoops! Something went wrong.', position:'bottom-right', type:'danger', removeAfter: '2000'})
      }else{
         let url = `/reading-flow/${flowID}`
         window.location.href = url
      }
   }
   let loading;
   async function requestFlows(){
      flows = await getFlows()
      archivedFlows = await getArchivedFlows()
      return
   }
   loading = requestFlows()
</script>

<svelte:head>
   <title>Otium | Reading Flow</title>
</svelte:head>


{#if $session}
{#await loading}
   <div class="loader"><Jumper size="60" color="#f2b3cf" unit="px" duration="1s"></Jumper></div>
{:then}
<h1>Reading Flows</h1>
<div class="book-list layout-list">
   <div on:click={invokeNewFlow} id="newflow">
      <p><i class="fa-solid fa-circle-plus"></i><br>New flow</p>
   </div>
</div>
<h2>Personal Flows</h2>
{#if flows.length > 0}
   <div class="flow_list">
      {#each flows as flow}
      <a href={flow.url}>
      <div class="flow">
         <p class="title">
            {flow.title}
            {#if flow.isPublic}
               <span class="public-pill" id="tag">Public</span>
            {:else}
               <span class="private-pill" id="tag">Private</span>
            {/if}
         </p>
         <p class="date">Flow created on {new Date(flow.created_at).getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/{new Date(flow.created_at).getMonth().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/{new Date(flow.created_at).getFullYear()}</p>
      </div>
      </a>
      {/each}
   </div>
{:else}
   <p class="not_found">No flows!</p>
{/if}
<br>
{#if archivedFlows.length > 0}
   <h2><i class="fa-solid fa-box-archive"></i> Archived flows</h2>
   {#each archivedFlows as flow}
      <div class="flow" on:click={(()=>{invokeUnarchiveFlow(flow.id)})}>
         <p class="title">
            {flow.title}
            {#if flow.isPublic}
               <span class="public" id="tag">Public</span>
            {:else}
               <span class="private" id="tag">Private</span>
            {/if}
         </p>
         <p class="date">Flow created on {new Date(flow.created_at).getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/{new Date(flow.created_at).getMonth().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/{new Date(flow.created_at).getFullYear()}</p>
      </div>
   {/each}
   <br>
{/if}
{/await}
{:else}
   <LoggedOutProfile />
{/if}

<style>
   .fa-solid{
      font-size: 21px;
   }
   #tag{
      font-size: 10.5px !important;
   }
   .title{
      display: flex;
      align-items: center;
      gap:10px;
      justify-content:flex-start;
      flex-wrap: wrap;
   }
</style>