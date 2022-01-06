<script context="module">
   import supabase from '$lib/db';
   async function requestBook(id){
      let request = await fetch('../api/book-' + id)
      let element = await request.json()
      return element.results
   }
   export async function load(){
      let DBbookshelf;
      let bookshelf = [];
      try{
         const session = supabase.auth.session()
         const userID = session.user.id
         const { data, error } = await supabase.from('profiles').select('bookshelf').eq('id', userID)
         DBbookshelf = data[0].bookshelf
         for(let book of DBbookshelf){
            book = await requestBook(book.id)
            bookshelf.push(book)
         }
         bookshelf = bookshelf.reverse()
      }catch(e){
         console.log(e)
         bookshelf = []
      }
      
      return {props:{bookshelf}}
   }
</script>

<script>
   import { session } from '$app/stores';
   import BookCard from '../components/BookCard.svelte';
   import LoggedOutProfile from '$components/LoggedOutProfile.svelte';
   export let bookshelf;
</script>

{#if $session}
   <h1>Bookshelf</h1>
   <div id="books" class="book-list layout-list">
      {#each bookshelf as book}
         <BookCard book={book} />
      {/each}
   </div>
{:else}
   <LoggedOutProfile />
{/if}