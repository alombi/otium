<script>
  import Select from 'svelte-select'
  import ISO6391 from 'iso-639-1';
  import { onMount } from 'svelte';
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
    <a id="tipLink" href="#" on:click={showAdvanced}>Advanced search</a>
    <div class="advanced">
      {#if value}
        <Select value={value} items={options} placeholder="Select language" on:select={selectLang} />
      {:else}
        <Select items={options} placeholder="Select language" on:select={selectLang} />
      {/if}
    </div>
    
    <p class="sidebarHeader">
      <span>Bookshelf</span>
    </p>
    <div class="headerLinks">
      <a href="/bookshelf">All bookshelf</a>
      <a href="#">Reading</a>
      <a href="#">To read</a>
      <a href="#">Already read</a>
      <a href="#">Favourites</a>
      <a href="#">Suggested</a>
    </div>

    <p class="sidebarHeader">
      <span>Sections</span>
    </p>
    <div class="headerLinks">
      <a href="/">Home</a>
      <a href="#">About</a>
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