<script>
    export let data;
    $: ({book, dataFiltered, tags, friends, id, bookshelf, flows, session} = data);
    import { isAdded, bookshelfTag, isStarred, progress, pagesRead } from '$lib/stores.js';
    import { page, navigating } from '$app/stores';
    import { onMount, onDestroy } from 'svelte';
    import ISO6391 from 'iso-639-1';
    import ActionsBar from '$lib/components/ActionsBar.svelte';
    import BookDescription from '$lib/components/BookDescription.svelte';
    $:{
        if(book){
            $progress = percentage($pagesRead, book.volumeInfo.pageCount).toFixed()
            if($progress == 'NaN'){
                $progress = 0
            }
        }
    }
    let cover, tag, year, lang;
    onMount(()=>{
        if($page.data.session && dataFiltered){
            $pagesRead = dataFiltered[0].progress;
            $progress = percentage($pagesRead, book.volumeInfo.pageCount).toFixed()
            console.log($progress == 'NaN')
            console.clear()
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
</script>

<svelte:head>
   <title>Otium | {book.volumeInfo.title}</title>
</svelte:head>

<span class="img"><img src={cover} alt=""></span>
{#if $isAdded && $bookshelfTag == undefined}
    <div id="tag_container">
        <p class="unset-pill" id="tag">{tags.unset}</p>
        {#if $isStarred}
            <p class='favorite-pill' id="tag">Starred</p>
        {/if}
    </div>
{:else if !$isAdded && $bookshelfTag != ''}
    <div id="tag_container">
        <p class="{$bookshelfTag}-pill" id="tag">{tags[$bookshelfTag]}</p>
        {#if $isStarred}
            <p class='favorite-pill' id="tag">Starred</p>
        {/if}
    </div>
{/if}

{#if $page.data.session && $bookshelfTag == 'reading'}
    <div class="progress"><progress value="{$pagesRead}" max="{book.volumeInfo.pageCount}"></progress></div>
{/if}
<h1>{book.volumeInfo.title}</h1>
<p id="author">by <span>{book.volumeInfo.authors[0]}</span></p>
{#if $page.data.session}
    <ActionsBar pagesRead={pagesRead} totalPages={book.volumeInfo.pageCount} title={book.volumeInfo.title} id={book.id} DB={dataFiltered} friends={friends} userID={$page.data.session.user.id} />
{/if}
<h3>Description</h3>
{#if !book.volumeInfo.description}
    <p>No description provided.</p>
{:else}
    <BookDescription description={book.volumeInfo.description} />
{/if}

<div class="grid">
    <div class="details">
        <h3>Details</h3>
        <p><b>Author</b>: {book.volumeInfo.authors[0]}</p>
        <p><b>Publisher</b>: {book.volumeInfo.publisher}</p>
        <p><b>Year</b>: {year}</p>
        <p><b>Language</b>: {lang}</p>
        <p><b>Pages</b>: {book.volumeInfo.pageCount}</p>
    </div>
    <h3>Public flows and reviews</h3>
</div>


<style lang="scss">
    .details p{
        margin-bottom:10px
    }
    .progress{
        padding-top: 10px;
        width: 35%;
        margin: auto;
    }
    #author{
        text-align: center;
        margin-top: -55px;
    }
    #author span{
        color:#00897b;
    }
    h1{
        text-align: center;
    }
    img{
        display: block;
        margin-left: auto;
        margin-right: auto;
        height: 50%;
    }
    @media only screen and (max-width: 600px) {
        .progress{
            width: 80%;

        }
    }
</style>