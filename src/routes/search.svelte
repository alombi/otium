<script context="module">
   export async function load({page}){
      const query = page.query.get('q')
      const lang = page.query.get('lang')
      let data;
      try{
         let request = await fetch('./api/bookSearch?q=' + query + '&lang=' + lang)
         data = await request.json()
         data = data.results
      }catch{
         data = null
      }
      return {props:{data, query}}
   }
</script>

<script>
   export let data = [], query;
   import { Jellyfish } from 'svelte-loading-spinners'
   import BookCard from '../components/BookCard.svelte';
   import Error from '../components/Error.svelte';
   import { browser } from '$app/env';
   import { onMount } from 'svelte';
   import ISO6391 from 'iso-639-1';

   let layout;
   onMount(()=>{
      if(browser){
         if(localStorage.getItem('layout')){
            layout = localStorage.getItem('layout')
         }else{
            layout = 'list'
         }
         if(layout == 'grid'){
            document.getElementById('books').classList.remove('layout-list');
            document.getElementById('books').classList.add('layout-grid');
         }
      }
   })
   function changeLayout(){
      if(browser){
         if(layout == 'list'){
            layout = 'grid'
            localStorage.setItem('layout', 'grid')
            document.getElementById('books').classList.remove('layout-list');
            document.getElementById('books').classList.add('layout-grid');
         }else{
            layout = 'list'
            localStorage.setItem('layout', 'list')
            document.getElementById('books').classList.add('layout-list');
            document.getElementById('books').classList.remove('layout-grid');
         }
      }
   }
   let searchTerm, langCode;
   function search(){
      if(window.localStorage.getItem('language') != undefined){
         langCode = ISO6391.getCode(window.localStorage.getItem('language'))
      }
      const url = '/search?q=' + searchTerm + '&lang=' + langCode;
      window.location.href = url;
   }
</script>

<div id="book-list-container">
   {#if !data}
      <div class="loader"><Jellyfish size="120" color="#f2b3cf" unit="px" duration="1s"></Jellyfish></div>
   {:else}
      <div id="searchBar-local">
         <form class="searchBar-alt" on:submit|preventDefault={search}>
            <input type="text" class="textForm" placeholder="Search per title" required="required" bind:value={searchTerm}>
            <button id="searchButton" type="submit"><i class="fas fa-search"></i></button>
         </form>
      </div>
      {#if !data.error}
         <div class="title-bar">
            <h1>Search results for: {query}</h1>
            <div>
               {#if layout == 'list'}
                  <button on:click={changeLayout} class="toolsButton"><i class="fas fa-th"></i></button>
               {:else}
               <button on:click={changeLayout} class="toolsButton"><i class="fas fa-th-list"></i></button>
               {/if}
            </div>
            
         </div>
         <div id="books" class="book-list layout-list">
            {#each data as book}
               <BookCard book={book} />
            {/each}
         </div>
      {:else}
         <Error />
      {/if}
   {/if}
</div>

<style>
   .searchBar-alt{
      padding-top:25px;
      text-align: center;
   }
   .searchBar-alt input{
      width: 70vw !important;
   }
   #searchBar-local{
      display: flex;
      justify-content: space-around !important;
   }
</style>