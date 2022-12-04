<svelte:head>
   <title>Otium | A free and open source bookshelf organizer</title>
</svelte:head>

<h1>What's new</h1>
<p>A page to track Otium's progress within time. For more details and code, check out Otium's <a href="https://github.com/alombi/otium" target="_blank">GitHub page</a>.</p>

<h2>4 December 2022</h2>
<ul>
    <li>><span class="release-tag new">NEW</span> Search has been revamped and it's now more efficient</li>
    <li><span class="release-tag fix">IMPROVEMENT</span> Improved security and efficiency of authentication</li>
    <li><span class="release-tag fix">FIX</span> Complete rewrite in order to migrate SvelteKit/li>
</ul>

<h2>2 August 2022</h2>
<ul>
   <li><span class="release-tag new">NEW</span> Added progress tracking for books with the Reading now tags!</li>
   <li><span class="release-tag new">NEW</span> Added a new public API endpoint, that returns the most recent book marked as Reading for an user</li>
</ul>

<h2>11 July 2022</h2>
<ul>
   <li><span class="release-tag new">NEW</span> Improved this page with NEW and FIX tags!</li>
   <li><span class="release-tag fix">FIX</span> Fixed the reading flow's listing</li>
   <li><span class="release-tag fix">FIX</span> Sidebar now opens fullscreen on mobile</li>
   <li><span class="release-tag fix">FIX</span> Added titles to login and signup pages</li>
</ul>

<h2>8 June 2022</h2>
<ul>
   <li><span class="release-tag new">NEW</span> A page for tracking Otium's progress and new features is here!</li>
   <li><span class="release-tag new">NEW</span> A new about section in the sidebar</li>
</ul>

<h2>29 March 2022</h2>
<ul>
   <li><span class="release-tag new">NEW</span> Hello Reading flows!</li>
   <li><span class="release-tag fix">FIX</span> New icons and metadata</li>
   <li><span class="release-tag fix">FIX</span> Overall modals improvements</li>
</ul>

<h2>23 March 2022</h2>
<ul>
   <li><span class="release-tag new">NEW</span> Notifications are now a thing!</li>
   <li><span class="release-tag fix">FIX</span> Improvements to authentication</li>
   <li><span class="release-tag fix">FIX</span> Home page redesign</li>
   <li><span class="release-tag fix">FIX</span> Various improvements updates</li>
</ul>

<h2>17 March 2022</h2>
<ul>
   <li><span class="release-tag new">NEW</span> Friendship and common books are now available</li>
   <li><span class="release-tag fix">FIX</span> Massive improvements to mobile UI</li>
</ul>

<h2>26 February 2022</h2>
<ul>
   <li><span class="release-tag new">NEW</span> Bookshelf are now a feature!</li>
   <li><span class="release-tag fix">FIX</span> Updated to latest SvelteKit changes</li>
   <li><span class="release-tag fix">FIX</span> Various login problems are fixed</li>
   <li><span class="release-tag fix">FIX</span> Fixed a problem with data not fetched after login</li>
</ul>

<h2>29 December 2021</h2>
<ul>
   <li><span class="release-tag new">NEW</span> Searching a book is now possible and very fast</li>
   <li><span class="release-tag new">NEW</span> Created Otium API</li>
   <li><span class="release-tag new">NEW</span> New style of various part of the website, including home and books' pages</li>
   <li><span class="release-tag fix">FIX</span> Fixed all the problems with deployment: the webiste is now live</li>
</ul>

<h2>7 November 2021</h2>
<ul>
   <li>Otium development begins!</li>
</ul>

<style>
   .release-tag{
      padding:2px 5px;
      border-radius: 4px;
   }
   .new{
      background-color: #4BB89A1a;
      color:#4BB89A
   }
   .fix{
         background-color: #bfd4f21a;
         color: #bfd4f2;
   }
   li{
      margin-top:8px;
   }
</style>