<script context="module">
   import supabase from '$lib/db';
   export async function load(ctx){
      const id = ctx.page.params.id;
      // Requesting data from Google
      let book;
      try{
         let request = await fetch('../api/book-' + id)
         book = await request.json()
         book = book.results
      }catch{
         book = null
      }
      // Requesting data from Otium DB
      let dataFiltered;
      try{
         const session = supabase.auth.session()
         const userID = session.user.id
         const { data, error } = await supabase.from('profiles').select('bookshelf').eq('id', userID)
         dataFiltered = data[0].bookshelf
         dataFiltered = dataFiltered.filter(function(e){
            return e.id == id
         })
         if(dataFiltered.length == 0){
            dataFiltered = null
         }
      }catch{
         dataFiltered = null
      }

      var tags = {
         unset: 'Added to bookshelf',
         read: 'Read',
         to_read: 'Marked as to read',
      }

      return {props:{book, dataFiltered, tags}}
   }
</script>

<script>
   import { session } from '$app/stores';
   import { onDestroy, onMount } from 'svelte';
   import { Jellyfish } from 'svelte-loading-spinners'
   import ActionsBar from '$components/ActionsBar.svelte';
   import Error from '$components/Error.svelte';
   import { isAdded } from '$lib/tag_store';
   
   export let book;
   export let dataFiltered;
   export let tags;
   let tag;
   let cover;
   let title = 'Loading';
   onMount(()=>{
      if(book.volumeInfo.imageLinks){
         cover = book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
      } else{
         cover = 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png'
      };
      title = book.volumeInfo.title;
      if(book.volumeInfo.description == undefined){
         book.volumeInfo.description = 'No description provided.'
      }
      if(dataFiltered){
         tag = dataFiltered[0].tag
         dataFiltered = dataFiltered
         isAdded.set(true)
      }
   })
   onDestroy(()=>{
      isAdded.set(false)
   })
</script>

<svelte:head>
   <title>Otium | {title}</title>
</svelte:head>

{#if !book}
      <div class="loader"><Jellyfish size="120" color="#f2b3cf" unit="px" duration="1s"></Jellyfish></div>
{:else}
   {#if !book.error}
      <div class="book-title-container">
         <img loading="eager" class="book-cover" src="{cover}" alt='cover'>
            {#if $isAdded}
               <div id="tag_container">
                  <p class={tag} id="tag">{tags.unset}</p>
                  {#if dataFiltered[0].starred}
                     <p class='favorite' id="tag">Starred</p>
                  {/if}
               </div>
            {/if}
            <h1 class="title-book">{book.volumeInfo.title}</h1>
            <h2 class="author title-book author-title">by <span id="author-name">{book.volumeInfo.authors[0]}</span></h2>
      </div>
      {#if $session}
         <ActionsBar id={book.id} DB={dataFiltered} />
      {/if}
      <div class="book-details-container">
         <div>
            <h2>Description</h2>
         <p>{@html book.volumeInfo.description}</p>
         </div>
         <div>
            <h2>Details</h2>
            <p><b>Author</b>: {book.volumeInfo.authors[0]}</p>
            <p><b>Publisher</b>: {book.volumeInfo.publisher}</p>
            <p><b>Year</b>: {book.volumeInfo.publishedDate.split('-')[0]}</p>
            <p><b>Language</b>: {book.volumeInfo.language}</p>
         </div>
      </div>
   {:else}
      <Error />
   {/if}
{/if}

<style>
   b{
      color:#fff3a3
   }
</style>