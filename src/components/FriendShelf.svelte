<script>
   import { Jumper } from 'svelte-loading-spinners'
   export let books;
   console.log(books)
   async function requestBook(id){
      let request = await fetch('../api/book-' + id)
      let element = await request.json()
      return element.results
   }
   let bookshelf = [];
   async function getBooks(){
      bookshelf = []
      for(let book of books){
         var bookFinal = {};
         bookFinal.user = book.user
         bookFinal.url = `/user/${book.userID}`
         book = await requestBook(book.id)
         try{
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
         }catch(e){
         console.log(e)
         }
      }
      return
   }

   let loading;
   setTimeout(async()=>{
      loading = getBooks()
   }, 500)
   bookshelf = []
</script>


<div id="books" class="book-list layout-list">
   {#await loading}
      <div class="loader"><Jumper size="60" color="#f2b3cf" unit="px" duration="1s"></Jumper></div>
   {:then loading} 
      {#if books.length != 0}
         {#each bookshelf as book}
            <div class="book-card">
               <a href={book.url}>
                  <div class="book-card-container">
                     <div>
                        <img src={book.cover} alt="cover">
                     </div>
                     <div id="book-card-text">
                        <p class="title">{book.title}</p>
                        <p class="author">by <i>{book.author}</i></p>
                        <p class="reader">Reading by <a href={book.url}><span>{book.user}</span></a></p>
                     </div>
                  </div>
               </a>
            </div>
         {/each}
      {:else}
         <p class="not_found">No books found!</p>
      {/if}
   {/await}
</div>

<style>
   span{
      color:#fff3a3
   }
</style>