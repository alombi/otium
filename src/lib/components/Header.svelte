<script>
// @ts-nocheck
    import { page } from '$app/stores';
    import { applyAction, enhance} from '$app/forms';
	  import { invalidate } from '$app/navigation';
    import { notifsUnread, bookshelfTag } from '$lib/stores.js';
    export let notifications = []
    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();
    
    var n = notifications.filter((i)=>{return !i.isRead})
    if(n.length > 0){
        notifsUnread.set(true)
    }

    function toggleSidebar(){
      if(document.getElementById('sidebar').style.display == 'none'){
        if(screen.width < 550){
          document.getElementById('real-page').style.overflow = 'none'
        }
        if(screen.width > 550){
          document.getElementById('page').style.paddingLeft = '240px';
        }
        document.getElementById('sidebar').style.display = 'block'
      }else{
        document.getElementById('page').style.paddingLeft = 0;
        document.getElementById('sidebar').style.display = 'none'
        if(screen.width < 550){
          document.getElementById('real-page').style.overflow = 'auto'
        }
      }
    }
    let loading = false;

	const handleLogout = () => {
		loading = true;
    bookshelfTag.set('')
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			} else {
				await applyAction(result);
			}
			loading = false;
      addNotification({text: 'See you soon!', position:'top-right', type:'default', removeAfter: '2000'})
		};
	};
</script>

<nav class="navbar">
  <div class="navbar-left">
    <button on:click={toggleSidebar} id="sidebarOpener" class="toolsButton"><i class="fa fa-bars" aria-hidden="true"></i></button>
    <a id="navbarBrand" href="/">
        Otium<!--  <code>v0.1</code></a> -->
  </div>
  
  <div class="navbar-right">
    {#if $page.data.session}
        <a class:unread_notification={$notifsUnread} class="toolsButton" href="/notifications"><i class="fa-solid fa-bell"></i></a>
        <form action="/logout" method="post" use:enhance={handleLogout}>
            <button disabled={loading} type="submit" class="buttonAuth">Sign out</button>
        </form>
    {:else}
    <button on:click={()=>window.location.href ='/'} class="buttonAuth" id="header-login-button">Sign in</button>
    {/if}
  </div>
</nav>

<style>
  .unread_notification{
    color:#ED8698
  }
  .navbar-right{
    display: flex;
    gap:3px;
    align-items: baseline;
  }
</style>
