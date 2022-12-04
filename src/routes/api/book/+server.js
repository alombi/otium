import { json } from "@sveltejs/kit"

export async function GET({ url }){
    const id = url.searchParams.get('id')
    const apiUrl = `https://www.googleapis.com/books/v1/volumes/${id}`
    let req = await fetch(apiUrl)
    var data = await req.json()
    return json(data)
}