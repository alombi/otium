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
         const session = supabase.auth.session().user.id
         const { data, error } = await supabase.from('profiles').select('bookshelf').eq('id', session)
         DBbookshelf = data[0].bookshelf.filter(function (e) {
            return e.tag == 'read'
         })
         for(let book of DBbookshelf){
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
            bookshelf.push(bookFinal)
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
   import LoggedOutProfile from '$components/LoggedOutProfile.svelte';
   import TagShelf from '$components/TagShelf.svelte';
   export let bookshelf;
   import { onMount } from 'svelte';
   onMount(()=>{
      document.getElementById('real-page').style.display = 'block';
      document.getElementById('waitingForBookshelfPageToBeOpened').style.display = 'none';
   })
</script>

<svelte:head>
   <title>Bookshelf | Read</title>
</svelte:head>

{#if $session}
   <h1>Already read</h1>
   <div id="books" class="book-list layout-list">
      <TagShelf bookshelf={bookshelf} />
   </div>
{:else}
   <LoggedOutProfile />
{/if}