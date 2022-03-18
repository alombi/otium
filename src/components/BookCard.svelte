<script>
   export let book;
   let url = `/books/${book.id}`;
   let author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : `Unknown`;
   let cover;
   if(book.volumeInfo.imageLinks){
      cover = book.volumeInfo.imageLinks.thumbnail.split('http://books.google.com/books/content?id=')[1]
   } else{
      cover = 'https://college.indiana.edu/images/publications/book-cover-placeholder.jpg'
   }
   let title = book.volumeInfo.title
   title = abbreviateTitle(title)
   let publisher = book.volumeInfo.publisher
   if(publisher == undefined){
      publisher =  retrievePublisher()
   }
   let year = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.split('-')[0] : 'Unknown'

   async function retrievePublisher(){
      let request = await fetch('https://www.googleapis.com/books/v1/volumes/' + book.id)
      let json = await request.json()
      return json.volumeInfo.publisher
   }
   function abbreviateTitle(title){
      if(title.split('').length > 90){
         title = title.slice(0, 87);
         title = title + '...'
         return title
      }else{
         return title
      }
   }
</script>


<div class="book-card">
   <a href={url}>
      <div class="book-card-container">
         <div>
            {#if cover.indexOf('college.indiana.edu') == -1}
               <img src="https://books.google.com/books/content?id={cover}" alt='cover'>
            {:else}
               <img src={cover} alt="cover">
            {/if}
         </div>
         <div id="book-card-text">
            <p class="title">{title}</p>
            <p class="author">by <i>{author}</i></p>
            {#await publisher}
            <p>Loading...</p>
            {:then publisher}
            <p>{publisher}, {year}</p>
            {/await}
         </div>
      </div>
   </a>
</div>