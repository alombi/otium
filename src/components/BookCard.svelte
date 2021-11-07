<script>
   export let book;
   let url = `/books/${book.id}`;
   let author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : `Unknown`;
   let cover = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png'
   let title = book.volumeInfo.title
   let publisher = book.volumeInfo.publisher
   let year = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.split('-')[0] : 'Unknown'
</script>


<div class="book-card">
   <a href={url}>
      <img src={cover} alt='cover'>
      <p class="title">{title}</p>
      <p class="author">by <i>{author}</i></p>
      <p>{publisher}, {year}</p>
   </a>
   
</div>