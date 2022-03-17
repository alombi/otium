<script>
   import { session } from '$app/stores';
   import { onMount } from "svelte";
   import ISO6391 from 'iso-639-1';
   import { Jellyfish } from 'svelte-loading-spinners'
   import Shelf from '$components/Shelf.svelte';

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
   let loaded = true;
   onMount(()=>{
      setTimeout(()=>{
      }, 500)
      document.getElementById('real-page').style.display = 'block';
      document.getElementById('waitingForBookshelfPageToBeOpened').style.display = 'none';
   })
</script>

<svelte:head>
   <title>Otium | A free and open source bookshelf organizer</title>
</svelte:head>

{#if $session}
<div id="loading-loader" class="loader"><Jellyfish size="120" color="#f2b3cf" unit="px" duration="1s"></Jellyfish></div>
   <div class="content">
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
      <Shelf tag="reading" />
      <!-- <a on:click={loadDirection} href="/bookshelf/reading">More</a> -->
      <h2>Friends are reading</h2>
   </div>
{:else}
   <h1>Welcome to Otium!</h1>
   <p>Otium is a free and open source bookshelf organizer, that helps you managing your books and the ones you would like to read.</p>
   <h2>Getting started</h2>
   <p>Ready to begin? Just insert your email and tap <b>Sign in</b>. In a few moments you'll receive an email containing a link, that will log you in into your new account!</p>
   <p>Whenever you want to access your account, just fill in your email and tap on the link that will be sent you.</p>
{/if}

<style>
   .content{
      display:none
   }
</style>