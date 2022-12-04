<script>
   export let bookshelf;
</script>


<div id="books" class="book-list layout-list">
   {#if bookshelf.length != 0}
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
                     <p>{book.publisher}, {book.year}</p>
                  </div>
               </div>
            </a>
         </div>
      {/each}
   {:else}
      <p class="not_found">No books found!</p>
   {/if}
</div>