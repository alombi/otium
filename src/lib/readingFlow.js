import supabase from '$lib/db';

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