<script>
    import { Menu, X, Bell, BellRing } from 'lucide-svelte';
    import { page } from '$app/stores'
    import { notifsUnread } from '../stores.js'
    export let sidebarOpen = false
    export let notifications = [];
    var n = notifications.filter((i)=>{return !i.isRead})
    if(n.length > 0){
        notifsUnread.set(true)
    }
</script>

<div class="fake-nav"></div>
<nav>
  <ul>
    {#if $page.data.session}
      <li><a on:click={() => sidebarOpen = !sidebarOpen} href="#">
        {#if sidebarOpen}
          <X />
        {:else}
          <Menu />
        {/if}
      </a></li>
    {/if}
    <li><strong>Otium</strong></li>
  </ul>
  <ul>
    {#if $page.data.session}
    <li>
      <a href="/notifications" style="color:unset">
        {#if $notifsUnread}
          <BellRing color=#e53935 />
        {:else}
          <Bell />
        {/if}
      </a>
    </li>
    <li>
        <form id="authform" action="/logout" method="post">
          <a class="button" role="button" href="" onclick="this.closest('form').submit();return false;">Logout</a>
        </form>
    </li>
    {:else}
    <li>
      <a class="button" role="button" href="/">Log in</a>
    </li>
    {/if}
  </ul>
</nav>

<style>
  nav{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding:0 var(--spacing);
    box-shadow: var(--card-box-shadow);
    -webkit-backdrop-filter: blur(250px);
    backdrop-filter: blur(250px);
  }
  .fake-nav{
    background-color: var(--card-background-color);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    opacity: .6;  
  }
    #plus {
      padding: 0px;
      border-radius: 50%;
    }
    #authform{
      margin-bottom: unset;
    }
    .button{
      padding-top: 6px;
      padding-bottom: 5px;
      font-size: 17px;
    }
</style>