<script>
  import Select from 'svelte-select'
  import ISO6391 from 'iso-639-1';
  import { onMount } from 'svelte';
  import { loading } from '$lib/utils';
  let languages = ISO6391.getAllNames()
  let options = []
  let value;
  onMount(()=>{
    if(window.localStorage.getItem('language') != undefined){
      value = window.localStorage.getItem('language')
      languagePreffered = ISO6391.getCode(value)
    }else{
      value = undefined
    }
  })
  languages.forEach( lang =>{
    let code = ISO6391.getCode(lang)
    var obj = {
      label: lang,
      value: code
    }
    options.push(obj)
  })
  let searchTerm, languagePreffered;
  function search(){
    const url = '/search?q=' + searchTerm + '&lang=' + languagePreffered;
    window.location.href = url;
  }
  function selectLang(event){
    window.localStorage.setItem('language', event.detail.label);
    languagePreffered = event.detail.value
  }
  function showAdvanced(){
    document.getElementsByClassName('advanced')[0].style.display = 'block'
    document.getElementById('tipLink').style.display = 'none'
  }
</script>

<div id="sidebar" class="sidebar">
  <div class="sidebar-content">

    <p class="sidebarHeader">
      <span>Search a book</span>
    </p>
    <form class="searchBar" on:submit|preventDefault={search}>
      <input type="text" class="textForm" placeholder="Search per title" required="required" bind:value={searchTerm}>
      <button id="searchButton" type="submit"><i class="fas fa-search"></i></button>
    </form>
    <a id="tipLink" href="#" on:click={showAdvanced}>Choose books language</a>
    <div class="advanced">
      {#if value}
        <Select value={value} items={options} placeholder="Select language" on:select={selectLang} />
      {:else}
        <Select items={options} placeholder="Select language" on:select={selectLang} />
      {/if}
    </div>

    <p class="sidebarHeader">
      <span>Sections</span>
    </p>
    <div class="headerLinks">
      <a on:click={()=>{loading('/')}} href="/"><i class="fa-solid fa-house"></i> Home</a>
      <a on:click={()=>{loading('/profile')}} href="/profile"><i class="fa-regular fa-user"></i> Profile</a>
    </div>

    
    <p class="sidebarHeader">
      <span>Bookshelf</span>
    </p>
    <div class="headerLinks">
      <a on:click={()=>{loading('/bookshelf/reading')}} href="/bookshelf/reading"><i class="fa-solid fa-book-bookmark"></i> Reading</a>
      <a on:click={()=>{loading('/bookshelf/to_read')}} href="/bookshelf/to_read"><i class="fa-regular fa-clock"></i> To read</a>
      <a on:click={()=>{loading('/bookshelf/read')}} href="/bookshelf/read"><i class="fa-regular fa-check"></i> Already read</a>
      <a on:click={()=>{loading('/bookshelf/favorites')}} href="/bookshelf/favorites"><i class="fa-regular fa-star"></i> Favourites</a>
      <a on:click={()=>{loading('/bookshelf/untagged')}} href="/bookshelf/untagged"><i class="fa-solid fa-tag"></i> Untagged</a>
    </div>

  </div>

</div>

<style>
  .textForm{
    padding-left: 2px;
    padding-right: 0px;
    max-width: 170px;
  }
  .textForm:focus{
    outline: none;
  }
  span{
    line-height: 1.5em;
  }
  .advanced{
    display:none;
    padding-top:10px;
    --background:#434c5e;
    --borderRadius:4px;
    --border:0px;
    --height:30px;
    --inputColor:white;
    --listBackground:#4c566a;
    --itemHoverBG:#434c5e;
    --inputFontSize:14px;
    --clearSelectTop:6px;
  }
</style>