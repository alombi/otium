<script>
   export let bookshelf
</script>


{#if bookshelf.length > 0}
   {#each bookshelf as book}
      <div class="book-card">
         <a href={book.url}>
            <div class="book-card-container">
               <div>
                  <img src={book.cover} alt="cover">
               </div>
               <div>
                  <p class="title">{book.title}</p>
                  <p class="author">by <i>{book.author}</i></p>
                  <p>{book.publisher}, {book.year}</p>
               </div>
            </div>
         </a>
      </div>
   {/each}
{:else}
   <p class="not_found">No books here!</p>
{/if}