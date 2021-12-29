<script>
   import { addToBookshelf } from '$lib/books'
   addToBookshelf()
</script>
<div class="buttons-container"> 
   <button class="book-actions add" on:click={addToBookshelf}><i class="fas fa-plus"></i> Add to bookshelf</button>
   <button class="book-actions share"><i class="fas fa-share"></i> Suggest to a friend</button>
   <!-- <button class="book-actions read"><i class="fas fa-check"></i> Mark as read</button>
   <button class="book-actions favorite"><i class="fas fa-star"></i> Star as favorite</button>
   <button class="book-actions to_read"><i class="fas fa-clock"></i> Mark to read</button> -->
</div>