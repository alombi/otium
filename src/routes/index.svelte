<script>
   import { session } from '$app/stores';
   import { onMount } from "svelte";
   import ISO6391 from 'iso-639-1';
   import { getBooksById } from '$lib/getBooksById';
   import { Jellyfish } from 'svelte-loading-spinners'
   import { browser } from '$app/env';

   function loadDirection(){
      // an alt version of loading() in Sidebar.svelte
      document.getElementById('real-page').style.display = 'none';
      document.getElementById('waitingForBookshelfPageToBeOpened').style.display = 'flex';
   }

   let searchTerm, langCode;
   function search(){
      if(window.localStorage.getItem('language') != undefined){
         langCode = ISO6391.getCode(window.localStorage.getItem('language'))
      }
      const url = '/search?q=' + searchTerm + '&lang=' + langCode;
      window.location.href = url;
   }
   let reading = [];
   let bookshelf = [];
   async function loading(){
      reading = await getBooksById('reading')
      for(let book of reading){
         book = await requestBook(book.id)

         var bookFinal = {};
         if(book.volumeInfo.imageLinks){
            bookFinal.cover = book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
         } else{
            bookFinal.cover = 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png'
         };
         bookFinal.title = book.volumeInfo.title;
         bookFinal.author = book.volumeInfo.authors[0];
         bookFinal.publisher = book.volumeInfo.publisher;
         bookFinal.year = book.volumeInfo.publishedDate.split('-')[0]
         bookFinal.url = `/books/${book.id}`
         bookshelf.push(bookFinal)
      }
      bookshelf = bookshelf.reverse()
      bookshelf = bookshelf.slice(0,2)
      return bookshelf
   }
   async function requestBook(id){
      let request = await fetch('../api/book-' + id)
      let element = await request.json()
      return element.results
   }
   let loaded = loading()

   onMount(()=>{
      if(screen.width < 750){
         document.getElementById('alternativeButton').style.display = 'inherit';
      }
   })
</script>

<svelte:head>
   <title>Otium | A free and open source bookshelf organizer</title>
</svelte:head>

{#if $session}
<div class="content">
   {#await loaded}
      <div class="loader"><Jellyfish size="120" color="#f2b3cf" unit="px" duration="1s"></Jellyfish></div>
   {:then}
      <div class="centered-welcome">
         <div>
            <h1>Welcome back!</h1>
            <form class="searchBar-alt" on:submit|preventDefault={search}>
               <input type="text" class="textForm" placeholder="Search per title" required="required" bind:value={searchTerm}>
               <button id="searchButton" type="submit"><i class="fas fa-search"></i></button>
            </form>
         </div>
      </div>
      <h2>Reading now</h2>
      <div id="books" class="book-list layout-list">
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
      </div>
      <a on:click={loadDirection} href="/bookshelf/reading">More</a>
      <h2>Friends are reading</h2>
   {/await}
</div>
{:else}
   <h1>Welcome to Otium!</h1>
   <p>Otium is a free and open source bookshelf organizer, that helps you managing your books and the ones you would like to read.</p>
   <h2>Getting started</h2>
   <p>Ready to begin? Just insert your email and tap <b>Sign in</b>. In a few moments you'll receive an email containing a link, that will log you in into your new account!</p>
   <p>Whenever you want to access your account, just fill in your email and tap on the link that will be sent you.</p>
{/if}