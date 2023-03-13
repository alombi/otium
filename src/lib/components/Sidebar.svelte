<script>
    import { X, Home, User, Library, GitCommit, Github, Search, Tag, Star, Clock, Check, BookOpen } from 'lucide-svelte';
    export let sidebarOpen = false;
    let bookshelfClosed = true;
</script>

<div class:sidebarOpen class="container-fluid">
    <nav>
        <ul><li></li></ul>
        <ul><li>
            <a on:click={() => sidebarOpen = !sidebarOpen} href="#">
                <X />
            </a>
        </li></ul>
    </nav>
    <aside>
        <ul class="sidebar-links">
            <li><h6>Sections</h6></li>
            <li><a on:click={() => sidebarOpen = !sidebarOpen} href="/"><span class="text-icon"><Home size=19/></span>Home</a></li>
            <li><a  on:click={() => sidebarOpen = !sidebarOpen} href="/profile"><span class="text-icon"><User size=19/></span>Profile</a></li>
            <!-- <li><a on:click={() => sidebarOpen = !sidebarOpen} href="/">Reading flow</a></li> -->
            <li><a on:click={() => {sidebarOpen = !sidebarOpen; window.location.href = '/bookshelf/favorites'}} href="/bookshelf/favorites"><span class="text-icon"><Star size=19/></span>Favorites</a></li>
            <li><a on:click={() => bookshelfClosed = !bookshelfClosed} href="#"><span class="text-icon"><Library size=19/></span>Bookshelf</a></li>
            <ul class:bookshelfClosed>
                <li><a on:click={() => {sidebarOpen = !sidebarOpen; window.location.href = '/bookshelf/reading'}} href="/bookshelf/reading"><span class="text-icon"><BookOpen size=19/></span>Reading now</a></li>
                <li><a on:click={() => {sidebarOpen = !sidebarOpen; window.location.href = '/bookshelf/to_read'}} href="/bookshelf/to_read"><span class="text-icon"><Clock size=19/></span>To Read</a></li>
                <li><a on:click={() => {sidebarOpen = !sidebarOpen; window.location.href = '/bookshelf/read'}} href="/bookshelf/read"><span class="text-icon"><Check size=19/></span>Already read</a></li>
                <li><a on:click={() => {sidebarOpen = !sidebarOpen; window.location.href = '/bookshelf/unset'}} href="/bookshelf/unset"><span class="text-icon"><Tag size=19/></span>Untagged</a></li>
            </ul>  
            <li><a on:click={() => sidebarOpen = !sidebarOpen} href="/search"><span class="text-icon"><Search size=19/></span>Search</a></li>
        </ul>
            <ul class="sidebar-links">
                <li><h6>About</h6></li>
                <li><a on:click={() => sidebarOpen = !sidebarOpen} href="/release_notes"><span class="text-icon"><GitCommit size=19/></span>What's new</a></li>
                <li><a on:click={() => sidebarOpen = !sidebarOpen} href="https://github.com/alombi/otium"><span class="text-icon"><Github size=19/></span>Source</a></li>
            </ul>
    </aside>
</div>


<style>
    .bookshelfClosed{
        display: none;
    }
    .sidebar-links li {
        margin-bottom: -18px;   
    }
    h6{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .sidebar-links li a {
        padding: 5px 15px;
        border-radius: 8px;
    }
    .sidebar-links li a:hover{
        background-color: #00897b1a;
        text-decoration: none;
    }
    div {
      position: absolute;
      height: 100%;
      width: 100%;
      /* bottom: -100%; */
      left:-100%;
      transition: left 0.3s ease-in-out;
      z-index: 1;
      background-color: #f6f8f9;
      overflow-y: scroll;
    }
    @media only screen and (prefers-color-scheme: dark) {
        div{
            background-color: #141e26;
        }
    }
    @media only screen and (min-width: 768px) {
        div {
            width: 30%;
        }
    }
  
    .sidebarOpen {
      /* slide on screen */
      left: 0
    }
  </style>