<script context="module">
   export async function load(ctx){
      const id = ctx.page.params.id;
      let book;
      try{
         let request = await fetch('../api/book-' + id)
         book = await request.json()
         book = book.results
      }catch{
         book = null
      }
      return {props:{book}}
   }
</script>

<script>
   export let book;
   let cover;
   let title = 'Loading';
   import { Jellyfish } from 'svelte-loading-spinners'
   import Error from '$components/Error.svelte';
   import { onMount } from 'svelte';
   onMount(()=>{
      if(book.volumeInfo.imageLinks){
      cover = book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
      } else{
         cover = 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png'
      };
      title = book.volumeInfo.title;
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
            <h1 class="title-book">{book.volumeInfo.title}</h1>
            <h2 class="author title-book author-title">by <span id="author-name">{book.volumeInfo.authors[0]}</span></h2>
      </div>
      <div class="buttons-container"> 
         <button class="book-actions add"><i class="fas fa-plus"></i> Add to bookshelf</button>
         <button class="book-actions read"><i class="fas fa-check"></i> Mark as read</button>
         <button class="book-actions favorite"><i class="fas fa-star"></i> Star as favorite</button>
         <!-- <button class="book-actions">Action</button> -->
      </div>
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