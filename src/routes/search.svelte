<script context="module">
   export async function load({page}){
      const query = page.query.get('q')
      let data;
      try{
         let request = await fetch('./api/bookSearch?q=' + query)
         data = await request.json()
         data = data.results
      }catch{
         data = null
      }
      return {props:{data, query}}
   }
</script>

<script>
   export let data = [], query;
   import { Jellyfish } from 'svelte-loading-spinners'
   import BookCard from '../components/BookCard.svelte';
   import Error from '../components/Error.svelte';

</script>

<div id="book-list-container">
   {#if !data}
      <div class="loader"><Jellyfish size="120" color="#f2b3cf" unit="px" duration="1s"></Jellyfish></div>
   {:else}
      {#if !data.error}
         <h1>Search results for: {query}</h1>
         <div class="book-list">
            {#each data as book}
               <BookCard book={book} />
            {/each}
         </div>
      {:else}
         <Error />
      {/if}
   {/if}
</div>