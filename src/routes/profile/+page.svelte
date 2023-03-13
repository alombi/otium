<script>
    import { answerFriendRequest, changeUsernameServer } from '$lib/userActions.js'
    import { Check, X } from 'lucide-svelte';
    import StatsBar from '$lib/components/StatsBar.svelte';
    export let data;
    $:({ id, profiles, friends, userData, stats } = data)
    let pending = data.friends.filter(friend => friend.pending && data.id === friend.receiver_id)
    async function invokeAnswerFriendRequest(isAccepted, friendship){
        let res = await answerFriendRequest(isAccepted, friendship)
        if(!res){
            document.getElementById(friendship.id).style.display = 'none';
            pending = pending.filter(friend => friend.id != friendship.id)
            friends.push(friendship)
        }
    }
    let searchTerm;
    function searchUser(){
        const url = '/search-user?q=' + searchTerm
        window.location.href = url;
    }
</script>

<svelte:head>
   <title>Otium | Profile</title>
</svelte:head>


<form on:submit|preventDefault={searchUser}>
    <input type="search" name="searchUser" id="searchUser" placeholder="Search user" bind:value={searchTerm}>
</form>
<h1>{userData[0].username}</h1>
<div class="pills"><StatsBar {stats} /></div>
<h3>Friends</h3>
<ul>
    {#each friends as friend}
        {#if friend.status != 'declined' != friend.pending}
            <li><a href={friend.friendURL} target="_parent">{friend.friendName}</a></li>
        {/if}
    {/each}
</ul>
{#if pending.length > 0}
    <details>
        <summary>Pending requests</summary>
        <ul>
            {#each friends as friend}
                {#if friend.pending && id === friend.receiver_id}
                    <li id={friend.id}>{friend.friendName} <a href="" on:click={()=>{invokeAnswerFriendRequest(true, friend)}}><Check /></a>   <a href="" on:click={()=>{invokeAnswerFriendRequest(false, friend)}}><X /></a></li>
                {/if}
            {/each}
        </ul>
    </details>
{/if}


<style>
    .pills{
        margin-top: -50px;
    }
</style>