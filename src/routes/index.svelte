<script context="module">
   import { whatAreFriendsReading } from '$lib/userActions';
   import supabase from '$lib/db';
   export async function load(){
      let id;
      let friendship;
      let friends = []
      try{
         const session = supabase.auth.session();
         id = session.user.id
         friendship = await supabase.from('friendship').select('*');
         friendship = friendship.data;
         friendship.filter(function (e){
            if(e.sender_id == id || e.receiver_id == id){
               if(e.status != 'declined' && !e.pending){
                  friends.push(e)
               }
            }
         })
      }catch{
      }
      friends.forEach(friend => {
         if(id != friend.receiver_id){
            friend.friendName = friend.receiver_name
            friend.friendID = friend.receiver_id
         }else{
            friend.friendName = friend.sender_name
            friend.friendID = friend.sender_id
         }
      });

      let books = await whatAreFriendsReading(friends)
      books = books.reverse()
      return { props: { books }}
   }
</script>
<script>
   import { session } from '$app/stores';
   import { onMount } from "svelte";
   import ISO6391 from 'iso-639-1';
   import { Jellyfish } from 'svelte-loading-spinners'
   import Shelf from '$components/Shelf.svelte';
   import FriendShelf from '$components/FriendShelf.svelte';
   export let books;

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
      <h2><i class="fa-solid fa-user-group"></i> Friends are reading</h2>
      <FriendShelf books={books} />
   </div>
{:else}
   <h1>Welcome to Otium!</h1>
   <p>Otium is a free and open source <span class="notif_username">book manager</span> and bookshelf organiser, that helps you managing your books and the ones you would like to read.</p>
   <p>One of its core features is also <span class="notif_username">sharing</span>: you can see what friends are reading, and suggest them a book.</p>
   <h2>Getting started</h2>
   <p>Ready to begin? Creating an account is easy: just tap on <b>Sign in</b>, insert your email and create a password. Once you'll have verified your account, you'll be ready to use all the features that Otium has to offer!</p>
   <h2>About the project</h2>
   <p>The aim of the project is to create a UI friendly, lightweight and simple bookshelf organizer for people who enjoy reading. Otium is open source at <a href="https://github.com/alombi/otium">github.com/alombi/otium</a> and is designed and developed by <a href="https://alombi.xyz">alombi</a>.</p>
{/if}

<style>
   .content{
      display:none
   }
   .textForm{
      width: 70vw;
   }
   .fa-solid{
      font-size: 21px;
   }
</style>