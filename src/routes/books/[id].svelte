<script context="module">
   import supabase from '$lib/db';
   export async function load({params}){
      const id = params.id;
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
         reading: 'Reading now'
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
   import BookDescription from '$components/BookDescription.svelte';
   import { isAdded, bookshelfTag, isStarred } from '$lib/tag_store';
   import ISO6391 from 'iso-639-1';

   
   export let book;
   export let dataFiltered;
   export let tags;
   let tag;
   let cover, year, lang;
   let title = 'Loading';
   onMount(()=>{
      lang = ISO6391.getName(book.volumeInfo.language)
      if(book.volumeInfo.publishedDate){
         year = book.volumeInfo.publishedDate.split('-')[0]
      }else{
         year = 'Unavailable'
      }
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
         if(tag == 'unset'){
            isAdded.set(true)
            bookshelfTag.set(undefined)
         }else{
            isAdded.set(false)
            bookshelfTag.set(tag)
         }
         if(dataFiltered[0].starred){
            isStarred.set(true)
         }
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
            {#if $isAdded && $bookshelfTag == undefined}
               <div id="tag_container">
                  <p class="unset" id="tag">{tags.unset}</p>
                  {#if $isStarred}
                     <p class='favorite' id="tag">Starred</p>
                  {/if}
               </div>
            {:else if !$isAdded && $bookshelfTag != undefined}
            <div id="tag_container">
               <p class={$bookshelfTag} id="tag">{tags[$bookshelfTag]}</p>
               {#if $isStarred}
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
            <BookDescription description={book.volumeInfo.description} />
         </div>
         <div>
            <h2>Details</h2>
            <p><b>Author</b>: {book.volumeInfo.authors[0]}</p>
            <p><b>Publisher</b>: {book.volumeInfo.publisher}</p>
            <p><b>Year</b>: {year}</p>
            <p><b>Language</b>: {lang}</p>
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