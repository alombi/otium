import supabase from '$lib/db';
import { writable } from "svelte/store";

export const annotations = writable([])

export async function createReadingFlow(bookID, title) {
   let res;
   const session = supabase.auth.session()
   const userID = session.user.id
   let flow = await supabase.from('reading_flow').select('*').eq('user_id', userID).eq('book_id', bookID)
   flow = flow.data
   if (flow.length == 0) {
      res = await supabase.from('reading_flow').insert([
         {
         title: title,
         user_id: userID,
         book_id: bookID,
         isArchived: false
         }
      ])
   } else {
      res = 'already created'
   }
   flow = await supabase.from('reading_flow').select('*').eq('user_id', userID).eq('book_id', bookID)
   return {res, flow}
}


export async function createAnnotation(flowID, annotationTitle, annotationQuote, annotationContent, annotationPage, annotationMoment) {
   let flow = await supabase.from('reading_flow').select('annotations').eq('id', flowID)
   let newData = flow.data[0].annotations
   var obj = {
      annotationTitle: annotationTitle,
      annotationContent: annotationContent,
      annotationQuote: annotationQuote,
      annotationPage: annotationPage,
      annotationMoment: annotationMoment
   }
   newData.push(obj)
   const { data, error } = await supabase.from('reading_flow').update({ annotations: newData }).eq('id', flowID)
   if (error) {
      console.log(error, data)
      return error
   }
}

export async function archiveFlow(flowID){
   const { data, error } = await supabase.from('reading_flow').update({ isArchived: true }).eq('id', flowID)
   if (error) {
      console.log(error)
      return error
   }
}

export async function unarchiveFlow(flowID){
   const { data, error } = await supabase.from('reading_flow').update({ isArchived: false }).eq('id', flowID)
   if (error) {
      console.log(error)
      return error
   }
}

export async function removeAnnotation(annotation, flowID) {
   let flow = await supabase.from('reading_flow').select('annotations').eq('id', flowID)
   let newData = flow.data[0].annotations.filter(function (e) {
      return e.annotationTitle != annotation.annotationTitle && e.annotationContent != annotation.annotationContent && e.annotationQuote != annotation.annotationQuote
   })
   const { data, error } = await supabase.from('reading_flow').update({ annotations: newData }).eq('id', flowID)
   if (error) {
      console.log(error)
      return 'problem'
   } else {
      return data[0].annotations
   }
}

export async function getFlows(){
   const session = supabase.auth.session()
   const userID = session.user.id
   let flows = await supabase.from('reading_flow').select('*').eq('user_id', userID).eq('isArchived', false)
   flows = flows.data
   flows.forEach(flow=>{
      flow.url = `/reading-flow/${flow.id}`
   })
   return flows
}

export async function getArchivedFlows(){
   const session = supabase.auth.session()
   const userID = session.user.id
   let archivedFlows = await supabase.from('reading_flow').select('*').eq('user_id', userID).eq('isArchived', true)
   archivedFlows = archivedFlows.data
   archivedFlows.forEach(flow=>{
      flow.url = `/reading-flow/${flow.id}`
   })
   return archivedFlows
}