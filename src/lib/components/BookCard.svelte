<script>
    export let book;
    export let tagshelf;
    let url, author, cover, title, publisher, year;
    if(!tagshelf){
        url = `/books/${book.id}`;
        author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : `Unknown`;
        cover;
        if(book.volumeInfo.imageLinks){
        cover = book.volumeInfo.imageLinks.thumbnail.split('http://books.google.com/books/content?id=')[1]
        } else{
        cover = 'https://college.indiana.edu/images/publications/book-cover-placeholder.jpg'
        }
        title = book.volumeInfo.title
        title = abbreviateTitle(title)
        publisher = book.volumeInfo.publisher
        if(publisher == undefined){
        publisher =  retrievePublisher()
        }
        year = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.split('-')[0] : 'Unknown'
    }
    async function retrievePublisher(){
       let request = await fetch('https://www.googleapis.com/books/v1/volumes/' + book.id)
       let json = await request.json()
       return json.volumeInfo.publisher
    }
    function abbreviateTitle(title){
       if(title.split('').length > 90){
            console.log(title)
            title = title.slice(0, 60);
            title = title + '...'
            return title
        }else{
            return title
        }
    }
</script>


{#if !tagshelf}
<div class="bookitem">
    <a href={url} style="text-decoration: none; color:unset;">
        <article class="other_now_reading">
            <span class="img">
                {#if cover.indexOf('college.indiana.edu') == -1}
                    <img src="https://books.google.com/books/content?id={cover}" alt='cover'>
                {:else}
                    <img src={cover} alt="cover">
                {/if}
            </span>
            <div>
                <h3 id="title">{title}</h3>
                <p class="author">{author}</p>
                {#await publisher}
                    <p class="publisher">Loading...</p>
                {:then publisher}
                    <p class="publisher">{publisher}, {year}</p>
                {/await}
            </div>
        </article>
    </a>
</div>
{:else}
<div class="bookitem">
    <a href={book.url} style="text-decoration: none; color:unset;">
        <article class="other_now_reading">
            <span class="img">
                <img src={book.cover} alt="cover">
            </span>
            <div id="text">
                <h3 id="title">{book.title}</h3>
                <p class="author">{book.author}</p>
                <p class="publisher">{book.publisher}, {book.year}</p>
            </div>
        </article>
    </a>
</div>
{/if}


<style>
    #text{
        margin-bottom:-50px ;
    }
    .bookitem{
        margin-bottom: -50px;
    }
    .publisher{
        margin-top:-25px;
        font-size: 16px;
    }
    .other_now_reading{
        display: flex;
        gap:10px;
        align-items: center;
    }
    .author{
        margin-top:-35px;
        font-size: 17px;
    }
    img{
        border-radius: 3px;
        height: 150px;
        min-width: 80px;
    }
    #title{
        font-size: 20px;
    }
</style>