<script>
   export let book;
   let url = `/books/${book.id}`;
   let author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : `Unknown`;
   let cover;
   if(book.volumeInfo.imageLinks){
      cover = book.volumeInfo.imageLinks.thumbnail.split('http://books.google.com/books/content?id=')[1]
   } else{
      cover = 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png'
   }
   let title = book.volumeInfo.title
   let publisher = book.volumeInfo.publisher
   let year = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.split('-')[0] : 'Unknown'
</script>


<div class="book-card">
   <a href={url}>
      <div class="book-card-container">
         <div>
            <img src="https://books.google.com/books/content?id={cover}" alt='cover'>
         </div>
         <div>
            <p class="title">{title}</p>
            <p class="author">by <i>{author}</i></p>
            <p>{publisher}, {year}</p>
         </div>
      </div>
   </a>
   
</div>