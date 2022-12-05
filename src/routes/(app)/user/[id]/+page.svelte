<script>
    import StatsBar from '$lib/components/StatsBar.svelte'
    import Shelf from '$lib/components/Shelf.svelte';
    import Switcher from '$lib/components/Switcher.svelte';
    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();
    export let data;
    $:({ dbData, id, friends, isFriend, user, stats, bookshelf} = data)
    
    let value = "Reading"
    $:{
        shelfArray = []
        changeBookshelf(value)
    }
    
    let shelfArray = []
    function changeBookshelf(value){
        var tag = value.toLowerCase().replace(' ', '_')
        if(tag != 'starred'){
            shelfArray = bookshelf.filter((item)=>{
                return item.tag == tag
            })
        }else{
            shelfArray = bookshelf.filter((item)=>{
                return item.starred
            })
        }
    }

    async function invokeSendFriendRequest(){
      if(dbData[0].username){
        let res = await sendFriendRequest(user.id, id)
        if(res){
            alert(res.message)
        }else{
            addNotification({text:'Sent!', position:'bottom-right', type:'success', removeAfter: '2000'})
            document.getElementById('friendButton').style.display = 'none';
        }
      }else{
        openModal(Modal, {title:"Whoops! Something went wrong", message:"Please create an username in your profile page before using social features!", showButtons:true})
      }
    }
</script>

<svelte:head>
    {#if dbData[0].username}
        <title>Otium | {dbData[0].username}</title>
    {:else}
        <title>>User {dbData[0].id.split('-')[0]}</title>
    {/if}
</svelte:head>


<div class="content">
    <div class="centered-welcome">
        <div id="buttonContainer">
            {#if dbData[0].username}<h1>{dbData[0].username}</h1>{:else}<h1>User {dbData[0].id.split('-')[0]}</h1>{/if}
            {#if user}
                <p>{#if !isFriend}<button id="friendButton" on:click|preventDefault={invokeSendFriendRequest}>Ask friendship</button>{/if}</p>
            {/if}
        </div>
       <StatsBar stats={stats} />
    </div>
    <h2>Friends</h2>
    {#if friends.length == 0}
       <p class="not_found">No friends yet!</p>
    {:else}
       <div class="friends">
       {#each friends as friend}
          {#if friend.status != 'declined'}
             <div class="friend">
                <a href={friend.friendURL} target="_parent"><p>{friend.friendName}</p></a>
                {#if friend.pending}
                   <p id="pending">Pending</p>
                {/if}
             </div>
          {/if}
       {/each}
       </div>
    {/if}
    
    <h2>Bookshelf</h2>
    <Switcher items={['Reading', 'To Read', 'Read', 'Starred'].map((i) => ({ l: `${i}`, v: i }))} bind:value/>
    <br>
    <Shelf bookshelf={shelfArray} />
</div>