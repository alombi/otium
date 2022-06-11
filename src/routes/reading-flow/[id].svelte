<script context="module">
   import supabase from '$lib/db';
   let userID;
   export async function load({params}){
      try{
         const session = supabase.auth.session()
         userID = session.user.id
      }catch{}
      const id = params.id;
      let flow = await supabase.from('reading_flow').select('*').eq('id', id)
      flow = flow.data[0]

      return {props:{flow, userID}}
   }
</script>


<script>
   import { openModal } from 'svelte-modals'
   import EditFlowModal from '$components/EditFlowModal.svelte';
   import { annotations, isPublic } from '$lib/readingFlow'
   export let flow, userID;
   annotations.set(flow.annotations.reverse())
   isPublic.set(flow.isPublic)
   let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

   function openCreateAnnotationPage(){
      window.location.href = '/reading-flow/new?id=' + flow.id
   }
   async function invokeEditFlowModal(){
      openModal(EditFlowModal, {title:'Edit flow', flow: flow})
   }
</script>

<svelte:head>
   <title>Otium | Reading flow: {flow.title}</title>
</svelte:head>

<div>
   <h1>{flow.title} 
      {#if $isPublic}
         <span class="public-pill" id="tag">Public</span>
      {:else}
         <span class="private-pill" id="tag">Private</span>
      {/if}
   </h1>
   <p class="date">Reading flow created on {new Date(flow.created_at).getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} {months[new Date(flow.created_at).getMonth()]} {new Date(flow.created_at).getFullYear()}</p>
   {#if userID == flow.user_id}
      <button class="buttonAuth" on:click={openCreateAnnotationPage}>New annotation</button>
      <button class="buttonAuth share" on:click={invokeEditFlowModal}>Edit flow</button>
      <br>
   {:else}
      <p class="date">Created by <span class="friend_name">{flow.user_name}</span></p>
   {/if}
   <br>
   <h2>Flow</h2>
   {#if $annotations.length == 0}
      <p class="not_found">No annotations yet. Create one!</p>
   {:else} 
      <div class="flow_list">
      {#each $annotations as annotation}
            <div class="flow">
               <p class="title">{annotation.annotationTitle} <span class="annotation_page">{annotation.annotationPage}</span></p>
               <p class="annotation_page">Added on {annotation.annotationMoment}</p>
               <a href={flow.id + "/" + annotation.annotationID}>Open</a>
            </div>
      {/each}
      </div>
   {/if}
   <br><br>
</div>


<style>
   h1{
      display: flex;
      align-items: center;
      gap:10px;
      justify-content:flex-start;
      flex-wrap: wrap;
   }
   #tag{
      font-size: 12px !important;
      margin-top: 8px;
   }
   /* These lines are here because :global doesn't seem to work in SCSS */
   .flow_list > :global(:nth-child(even)){
      margin-left:40px;
   }
   .flow_list > :global(:nth-child(odd)){
      margin-right: 40px;
   }
   @media(max-width:550px){
      .flow_list > :global(:nth-child(even)){
         margin-left:25px;
      }
      .flow_list > :global(:nth-child(odd)){
         margin-right: 25px;
      }
   }
</style>