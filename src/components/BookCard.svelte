<script>
   export let book;
   let author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : `Unknown`;
   let cover = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png'
   let title = book.volumeInfo.title
</script>


<div class="book-card">
   <img src={cover} alt='cover'>
   <p class="title">{title}</p>
   <p class="author">by <i>{author}</i></p>
</div>