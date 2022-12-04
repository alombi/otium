<script>
	import { onMount, onDestroy } from "svelte";
    import { isAdded, bookshelfTag, isStarred, progress, pagesRead } from '$lib/stores.js';
    import BooksInCommon from "$lib/components/BooksInCommon.svelte";
    import ActionsBar from '$lib/components/ActionsBar.svelte';
    import BookDescription from "$lib/components/BookDescription.svelte";
    import ISO6391 from 'iso-639-1';
    import { page } from '$app/stores';
    export let data;
    $: ({book, dataFiltered, tags, friends, id, bookshelf, flows, session} = data);
    let cover, tag, year, lang;

    $:{
        if(book){
            $progress = percentage($pagesRead, book.volumeInfo.pageCount).toFixed()
            if($progress == 'NaN'){
                $progress = 0
            }
        }
    }
    
    onMount(()=>{
        if($page.data.session && dataFiltered){
            $pagesRead = dataFiltered[0].progress;
            $progress = percentage($pagesRead, book.volumeInfo.pageCount).toFixed()
            console.log($progress == 'NaN')
        }
        if(book.volumeInfo.imageLinks){
            cover = book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
        } else{
            cover = 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png'
        };
        if(book.volumeInfo.publishedDate){
            year = book.volumeInfo.publishedDate.split('-')[0]
        }else{
            year = 'Unavailable'
        }
        if(book.volumeInfo.description == undefined){
            book.volumeInfo.description = 'No description provided.'
        
        }
        lang = ISO6391.getName(book.volumeInfo.language)
        if(dataFiltered){
            tag = dataFiltered[0].tag
            dataFiltered = dataFiltered
            if(tag == 'unset'){
                isAdded.set(true)
                bookshelfTag.set(undefined)
            }else{
                isAdded.set(false)
                bookshelfTag.set(tag)
            }
            if(dataFiltered[0].starred){
                isStarred.set(true)
            }
        }
    })
    onDestroy(()=>{
        isAdded.set(false)
        isStarred.set(false)
    })
    function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }
    console.log($isAdded)
</script>

<svelte:head>
   <title>Otium | {book.volumeInfo.title}</title>
</svelte:head>



<div class="book-title-container">
    <img class="book-cover" src="{cover}" alt='cover'>
     {#if $isAdded && $bookshelfTag == undefined}
        <div id="tag_container">
            <p class="unset-pill" id="tag">{tags.unset}</p>
            {#if $isStarred}
                <p class='favorite-pill' id="tag">Starred</p>
            {/if}
        </div>
    {:else if !$isAdded && $bookshelfTag != ''}
        <div id="tag_container">
            <p class="{$bookshelfTag}-pill" id="tag">{tags[$bookshelfTag]} {#if $bookshelfTag == 'reading'} - {$progress}%{/if}</p>
            {#if $isStarred}
                <p class='favorite-pill' id="tag">Starred</p>
            {/if}
        </div>
    {/if} 
    <BooksInCommon friends={friends} id={id} bookshelf={bookshelf} />
    <h1 class="title-book">{book.volumeInfo.title}</h1>
    <h2 class="author title-book author-title">by <span id="author-name">{book.volumeInfo.authors[0]}</span></h2>
</div>
{#if $page.data.session}
    <ActionsBar pagesRead={pagesRead} totalPages={book.volumeInfo.pageCount} title={book.volumeInfotitle} id={book.id} DB={dataFiltered} friends={friends} userID={$page.data.session.user.id} />
{/if}
<div>
    <h2>Description</h2>
    {#if !book.volumeInfo.description}
       <p>No description provided.</p>
    {:else}
       <BookDescription description={book.volumeInfo.description} />
    {/if}
 </div>
 <div class="book-details-container">
    <div>
       <h2>Details</h2>
       <p><b>Author</b>: {book.volumeInfo.authors[0]}</p>
       <p><b>Publisher</b>: {book.volumeInfo.publisher}</p>
       <p><b>Year</b>: {year}</p>
       <p><b>Language</b>: {lang}</p>
       <p><b>Pages</b>: {book.volumeInfo.pageCount}</p>
    </div>
    <h2>Public flows and reviews</h2>

 </div>