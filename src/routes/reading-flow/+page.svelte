<script>
    import { openModal } from 'svelte-modals'
    //import BooksModal from '$lib/components/BooksModal.svelte';
    export let data
    $:({ flows, archivedFlows, bookshelf } = data)
</script>

<h1>Maintenance. This page will be back soon.</h1>

<!-- <h1>Reading Flows</h1>
<div class="book-list layout-list">
   <div on:click={invokeNewFlow} id="newflow">
      <p><i class="fa-solid fa-circle-plus"></i><br>New flow</p>
   </div>
</div>
<h2>Personal Flows</h2>
{#if flows.length > 0}
   <div class="flow_list">
      {#each flows as flow}
      <a href={flow.url}>
      <div class="flow">
         <p class="title">
            {flow.title}
            {#if flow.isPublic}
               <span class="public-pill" id="tag">Public</span>
            {:else}
               <span class="private-pill" id="tag">Private</span>
            {/if}
         </p>
         <p class="date">Flow created on {new Date(flow.created_at).getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/{new Date(flow.created_at).getMonth().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/{new Date(flow.created_at).getFullYear()}</p>
      </div>
      </a>
      {/each}
   </div>
{:else}
   <p class="not_found">No flows!</p>
{/if}
<br>
{#if archivedFlows.length > 0}
   <h2><i class="fa-solid fa-box-archive"></i> Archived flows</h2>
   {#each archivedFlows as flow}
      <div class="flow" on:click={(()=>{invokeUnarchiveFlow(flow.id)})}>
         <p class="title">
            {flow.title}
            {#if flow.isPublic}
               <span class="public-pill" id="tag">Public</span>
            {:else}
               <span class="private-pill" id="tag">Private</span>
            {/if}
         </p>
         <p class="date">Flow created on {new Date(flow.created_at).getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/{new Date(flow.created_at).getMonth().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}/{new Date(flow.created_at).getFullYear()}</p>
      </div>
   {/each}
   <br>
{/if} -->


<style>
    .fa-solid{
       font-size: 21px;
    }
    #tag{
       font-size: 10.5px !important;
    }
    .title{
       display: flex;
       align-items: center;
       gap:10px;
       justify-content:flex-start;
       flex-wrap: wrap;
    }
</style>