<script>
  let searchTerm;
  function search(){
    const url = '/search?q=' + searchTerm;
    window.location.href = url;
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
    <a id="tipLink" href="">Advanced search</a>
    
    <p class="sidebarHeader">
      <span>Bookshelf</span>
    </p>
    <div class="headerLinks">
      <p><a href="">Reading</a></p>
      <p><a href="">To read</a></p>
      <p><a href="">Already read</a></p>
      <p><a href="">Favourites</a></p>
      <p><a href="">Suggested</a></p>
    </div>

    <p class="sidebarHeader">
      <span>Sections</span>
    </p>
    <div class="headerLinks">
      <p><a href="/">Home</a></p>
      <p><a href="">About</a></p>
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
</style>