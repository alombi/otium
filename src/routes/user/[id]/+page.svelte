<script>
    import StatsBar from '$lib/components/StatsBar.svelte'
    import BookCard from '$lib/components/BookCard.svelte';
    export let data;
    $:({ dbData, id, friends, isFriend, user, stats, bookshelf} = data)
    async function invokeSendFriendRequest(){
      if(dbData[0].username){
        let res = await sendFriendRequest(user.id, id)
        if(res){
            alert(res.message)
        }else{
            document.getElementById('friendButton').style.display = 'none';
        }
      }else{
        // openModal(Modal, {title:"Whoops! Something went wrong", message:"Please create an username in your profile page before using social features!", showButtons:true})
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



<h1>{dbData[0].username}</h1>
{#if user}
    <p>{#if !isFriend}<button id="friendButton" on:click|preventDefault={invokeSendFriendRequest}>Ask friendship</button>{/if}</p>
{/if}
<div class="pills"><StatsBar {stats} /></div>
<h2>Friends</h2>
{#if friends.length == 0}
<p class="not_found">No friends yet!</p>
{:else}
<div class="friends">
    <ul>
        {#each friends as friend}
            {#if friend.status != 'declined' != friend.pending}
                <li><a href={friend.friendURL} target="_parent">{friend.friendName}</a></li>
            {/if}
        {/each}
    </ul>
</div>
{/if}
<hr>
<h3>Reading now</h3>
<div class="book-list">
    {#each bookshelf as book}
        {#if book.tag == 'reading'}
            <BookCard {book} tagshelf={true} />
        {/if}
    {/each}
    {#if bookshelf.filter((item)=>{return item.tag == 'reading'}).length == 0}
        <p class="not_found">No books tagged as reading now yet!</p>
    {/if}
</div>
<h3>Starred</h3>
<div class="book-list">
    {#each bookshelf as book}
        {#if book.starred}
            <BookCard {book} tagshelf={true} />
        {/if}
    {/each}
    {#if bookshelf.filter((item)=>{return item.starred}).length == 0}
        <p class="not_found">No books tagged as favorites yet!</p>
    {/if}
</div>
<h3>Read</h3>
<div class="book-list">
    {#each bookshelf as book}
        {#if book.tag == 'read'}
            <BookCard {book} tagshelf={true} />
        {/if}
    {/each}
    {#if bookshelf.filter((item)=>{return item.tag == 'read'}).length == 0}
        <p class="not_found">No books tagged as alreay read!</p>
    {/if}
</div>
<h3>To read</h3>
<div class="book-list">
    {#each bookshelf as book}
        {#if book.tag == 'to_read'}
            <BookCard {book} tagshelf={true} />
        {/if}
    {/each}
    {#if bookshelf.filter((item)=>{return item.tag == 'to_read'}).length == 0}
        <p class="not_found">No books tagged as to read yet!</p>
    {/if}
</div>




<style>
    .pills{
        margin-top: -50px;
    }
    .book-list{
        margin-top:-40px;
        display: grid;
        grid-template-columns: 100%;
        gap: 20px;
    }
    @media only screen and (min-width: 768px) {
        .book-list {
            grid-template-columns: 50% 50%;
        }
    }
</style>