<script>
    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();
    import { onMount } from 'svelte';
    import { answerFriendRequest, changeUsernameServer } from '$lib/userActions.js'
    import Banner from '$lib/components/Banner.svelte';
    import StatsBar from '$lib/components/StatsBar.svelte';
    export let data;
    $:({ id, profiles, friends, userData, stats } = data)
    let usernameMissing = false;
    let name;
    onMount(()=>{
        if(userData){
            name = userData[0].username;
            if(userData[0].username == undefined || userData[0].username == ''){
                name = userData[0].id
                usernameMissing = true;
            }
        }
    })


    let searchTerm;
    let results = [];
    let searchRes = [];
    function search(){
        let usernames = [];
        profiles.forEach(profile => { 
            if(profile.username)
                usernames.push(profile.username) 
            });
            usernames.forEach(username =>{
                if(username.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1){
                var obj = {
                name: username
                }
                profiles.forEach(profile =>{ if(profile.username == username){obj.url = '/user/' + profile.id} })
                results.push(obj)
            }
        })
        if(results.length > 0){
            document.getElementById('results_container').style.display = 'flex'
            addNotification({text:`Found ${results.length} results`, position:'bottom-right', type:'success', removeAfter: '2000'})
            searchRes = results
        }else{
            addNotification({text:'No results', position:'bottom-right', type:'danger', removeAfter: '2000'})
        }
        results = []
   }

    async function invokeAnswerFriendRequest(isAccepted, friendship){
        let res = await answerFriendRequest(isAccepted, friendship)
        if(res){
            addNotification({text:'Something went wrong!', position:'bottom-right', type:'danger', removeAfter: '2000'})
        }else{
            document.getElementById('pending_container').style.display = 'none';
            addNotification({text:'Accepted!', position:'bottom-right', type:'success', removeAfter: '2000'})
        }
    }
    async function changeUsername(){
        document.getElementById('bannerInput').disabled = 'true';
        document.getElementById('ready').disabled = 'true';
        let username = document.getElementById('bannerInput').value;
        let result = await changeUsernameServer(username, id)
        if(result){
            alert(result.message)
        }else{
            document.getElementsByClassName('banner')[0].style.display = 'none';
            name = username;
        }
   }
</script>

<svelte:head>
   <title>Otium | Profile</title>
</svelte:head>


<div id="searchBar-local">
    <form class="searchBar-alt searchBar-search-and-profile" on:submit|preventDefault={search}>
       <input type="text" class="textForm" placeholder="Search per username" autocomplete="off" required="required" bind:value={searchTerm}>
       <button id="searchButton" type="submit"><i class="fas fa-search"></i></button>
    </form>
</div>
<div id="results_container">
    <div id="results">
       {#each searchRes as result}
          <p><a href={result.url}>{result.name}</a></p>
       {/each}
    </div>
</div>

<div class="centered-welcome">
    <h1>Welcome back {name}!</h1>
    {#if usernameMissing}
        <Banner desc="Complete your profile by creating an username" button="Create" func={()=>changeUsername()} advancedTitle="Create username"/>
    {/if}
    <StatsBar stats={stats}/>
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
            <div id="pending_container">
                {#if friend.pending && id === friend.receiver_id}
                   <button id="friendButton" on:click={()=>{invokeAnswerFriendRequest(true, friend)}}>Accept</button>
                   <button id="friendButton" on:click={()=>{invokeAnswerFriendRequest(false, friend)}}>Decline</button>
                {:else if friend.pending && id != friend.receiver_id}
                    <p id="pending">Pending</p>
                {/if}
             </div>
          </div>
       {/if}
    {/each}
    </div>
{/if}