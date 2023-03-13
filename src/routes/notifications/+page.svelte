<script>
    import { supabaseClient } from '$lib/db'
    export let data;
	$: ({ notifications, user } = data);

    async function markAsRead(id, url){
        var {data, error} = await supabaseClient.from('notifications').update({'isRead':true}).eq('id', id);
        if (error) {
            console.error(error)
        } else {
            let unreadNotifications = await supabaseClient.from('notifications').select('*').is('isRead', false)
            unreadNotifications = unreadNotifications.data
            if (unreadNotifications.length == 0) {
                notifsUnread.set(false)
            }
        }
        window.location.href = url
    }
</script>

<svelte:head>
    <title>Otium | Notifications</title>
</svelte:head>

<h1>Notifications</h1>
{#if notifications.length == 0}
    <p class="not_found">No notifications!</p>
{:else}
    <div class="notifications">
        {#each notifications as notification}
            <div class="notification">
                {#if !notification.isRead}
                    <div class="bullet"></div>
                {:else}
                    <div class="bullet bullet_read"></div>
                {/if}
                <p><a on:click={markAsRead(notification.id, notification.link)} class="notif_link">{@html notification.content}</a><br><span class="notif_date">{new Date(notification.created_at).getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/{new Date(notification.created_at).getMonth().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/{new Date(notification.created_at).getFullYear()} - {new Date(notification.created_at).getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:{new Date(notification.created_at).getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span></p>
            </div>
        {/each}
    </div>
{/if}

<style>
    .notifications{
        display: flex;
        flex-direction: column;
    }
    .notif_date{
        font-size: 15px;
        opacity: 0.6;
    }
</style>


