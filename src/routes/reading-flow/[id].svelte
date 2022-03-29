<script context="module">
   import supabase from '$lib/db';
   export async function load({params}){
      const id = params.id;
      let flow = await supabase.from('reading_flow').select('*').eq('id', id)
      flow = flow.data[0]

      return {props:{flow}}
   }
</script>


<script>
   import { openModal } from 'svelte-modals'
   import AnnotationModal from '$components/AnnotationModal.svelte';
   import { archiveFlow } from '$lib/readingFlow';
   import { getNotificationsContext } from 'svelte-notifications';
   const { addNotification } = getNotificationsContext();
   import { annotations } from '$lib/readingFlow'
   import { loading } from '$lib/utils';
   export let flow;
   annotations.set(flow.annotations.reverse())
   let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

   function openAnnotation(annotation){
      if(annotation.annotationQuote){
         openModal(AnnotationModal, {title:annotation.annotationTitle, message:annotation.annotationContent, containsQuote:true, quote:annotation.annotationQuote, annotation:annotation, flow:flow})
      }else{
         openModal(AnnotationModal, {title:annotation.annotationTitle, message:annotation.annotationContent, containsQuote:false, annotation:annotation, flow:flow})
      }
   }
   function openCreateAnnotationPage(){
      window.location.href = '/reading-flow/new?id=' + flow.id
   }
   async function invokeArchiveFlow(){
      let res = await archiveFlow(flow.id)
      if(res){
         addNotification({text:'Whoops! Something went wrong.', position:'bottom-right', type:'danger', removeAfter: '2000'})
      }else{
         loading('/reading-flow')
         window.location.href = '/reading-flow'
      }
   }
</script>

<svelte:head>
   <title>Otium | {flow.title} reading flow</title>
</svelte:head>

<div>
   <h1>{flow.title}</h1>
   <p class="date">Reading flow created on {new Date(flow.created_at).getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} {months[new Date(flow.created_at).getMonth()]} {new Date(flow.created_at).getFullYear()}</p>
   <button class="buttonAuth" on:click={openCreateAnnotationPage}>New annotation</button>
   <br><br>
   <h2>Flow</h2>
   {#if $annotations.length == 0}
      <p class="not_found">No annotations yet. Create one!</p>
   {:else} 
      <div class="flow_list">
      {#each $annotations as annotation}
            <div class="flow" on:click={(()=>{openAnnotation(annotation)})}>
               <p class="title">{annotation.annotationTitle} <span class="annotation_page">{annotation.annotationPage}</span></p>
               <p class="annotation_page">Added on {annotation.annotationMoment}</p>
            </div>
      {/each}
      </div>
   {/if}
   <br><br>
   <button class="buttonAuth remove" on:click={invokeArchiveFlow}>Archive flow</button>
</div>


<style>
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