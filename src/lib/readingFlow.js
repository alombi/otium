import { v4 as uuidv4 } from 'uuid';
import { supabaseClient } from '$lib/db';



export async function getFlows(userID){
    let flows = await supabaseClient.from('reading_flow').select('*').eq('user_id', userID).eq('isArchived', false)
    flows = flows.data
    flows.forEach(flow=>{
       flow.url = `/reading-flow/${flow.id}`
    })
    return flows
 }
 
 export async function getArchivedFlows(userID){
    let archivedFlows = await supabaseClient.from('reading_flow').select('*').eq('user_id', userID).eq('isArchived', true)
    archivedFlows = archivedFlows.data
    archivedFlows.forEach(flow=>{
       flow.url = `/reading-flow/${flow.id}`
    })
    return archivedFlows
 }