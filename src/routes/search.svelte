<script context="module">
   export async function load({page}){
      const query = page.query.get('q')
      let data;
      try{
         let request = await fetch('./api/bookSearch?q=' + query)
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

   let title;
   if(data){
      title = `Results for ${query}`
   }else{
      title = 'Searching'
   }

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
</script>

<svelte:head>
   <title>Otium | {title}</title>
</svelte:head>

<div id="book-list-container">
   {#if !data}
      <div class="loader"><Jellyfish size="120" color="#f2b3cf" unit="px" duration="1s"></Jellyfish></div>
   {:else}
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