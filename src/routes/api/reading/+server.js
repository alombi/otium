import { json } from "@sveltejs/kit"
import { supabaseClient } from "$lib/db"

export async function GET({ url }){
    let userBookshelf;
    const userID = url.searchParams.get('user')
    const { data, error } = await supabaseClient.from('profiles').select('bookshelf').eq('id', userID)
    userBookshelf = data[0].bookshelf.filter(function (e) {
        return e.tag == 'reading'
    })
    userBookshelf = userBookshelf.reverse()[0] 

    let request = await fetch('https://otium.vercel.app/api/book?id=' + userBookshelf.id)
    let book = await request.json()
    return json({db: userBookshelf, book: book})
}