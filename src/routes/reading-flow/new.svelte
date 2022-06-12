<script context="module">
   export async function load({url}){
      const id =  url.searchParams.get('id')
      return {props:{id}}
   }
</script>

<script>
   import { Jumper } from 'svelte-loading-spinners';
   import { createAnnotation } from '$lib/readingFlow';
   import { openModal } from 'svelte-modals'
   import Modal from '$components/Modal.svelte';
   export let id;
   let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
   let title, quote, annotation, page;
   async function invokeCreateAnnotation(){
      document.getElementById('new_annotation_form').style.display = 'none';
      document.getElementById('loader').style.display = 'flex'
      let now = new Date()
      let date = `${now.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} ${months[now.getMonth()]} ${now.getFullYear()}`
      let res = await createAnnotation(id, title, quote, annotation, page, date)
      if(res){
         document.getElementById('new_annotation_form').style.display = 'none';
         document.getElementById('loader').style.display = 'flex'
         openModal(Modal, {title:"Whoops!", message:`An error occurred: ${error.message}`, showButtons:true})
      }else{
         window.location.href = `/reading-flow/${id}`
      }
   }
</script>

<svelte:head>
   <title>Otium | New annotation</title>
</svelte:head>

<h1>New annotation</h1>
<div id="loader" class="loader"><Jumper size="120" color="#f2b3cf" unit="px" duration="1s"></Jumper></div>
<form id="new_annotation_form" on:submit|preventDefault={invokeCreateAnnotation} >
   <input required="required" type="text" name="title" class="textForm" placeholder="Title" bind:value={title}>
   <input required="required" type="text" name="page" class="textForm" placeholder="Page, section or chapter" bind:value={page}>
   <h2>Quote</h2>
      <textarea name="quote" class="textForm" id="quote" placeholder="Type in a quote (if you would not like to insert a quote, live this field blank)" bind:value={quote}></textarea>
   <h2>Annotation</h2>
      <textarea name="quote" class="textForm" id=""placeholder="Write your annotations here (if you would not like to insert an annotation, leave this field blank" bind:value={annotation}></textarea>
   <h2>Create</h2>
      <button class="buttonAuth" type="submit">Create annotation</button>
      <br><br>
</form>


<style>
   #loader{
      display: none;
   }
</style>