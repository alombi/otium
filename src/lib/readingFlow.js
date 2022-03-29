import supabase from '$lib/db';
import { writable } from "svelte/store";
import {v4 as uuidv4} from 'uuid';

export const annotations = writable([])
export const isPublic = writable()

export async function createReadingFlow(bookID, title) {
   let res;
   const session = supabase.auth.session()
   const userID = session.user.id
   let flow = await supabase.from('reading_flow').select('*').eq('user_id', userID).eq('book_id', bookID)
   flow = flow.data
   if (flow.length == 0) {
      let author = await supabase.from('profiles').select('username').eq('id', userID)
      author = author.data[0].username
      res = await supabase.from('reading_flow').insert([
         {
         title: title,
         user_id: userID,
         user_name:author,
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
   let uuid = uuidv4();
   var obj = {
      annotationID: uuid,
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
      return e.annotationID != annotation.annotationID
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

export async function switchVisibility(flowID, isPublic) {
   const { data, error } = await supabase.from('reading_flow').update({ isPublic: !isPublic }).eq('id', flowID)
   if (error) {
      console.log(error)
      return error
   }
}