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
   import { Jellyfish } from 'svelte-loading-spinners'
   import Error from '$components/Error.svelte';
</script>

{#if !book}
      <div class="loader"><Jellyfish size="120" color="#f2b3cf" unit="px" duration="1s"></Jellyfish></div>
{:else}
   {#if !book.error}
      <p>page</p>
   {:else}
      <Error />
   {/if}
{/if}