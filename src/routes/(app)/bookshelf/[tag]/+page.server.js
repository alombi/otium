import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';

export async function load(event){
    const { session, supabaseClient } = await getSupabase(event);
    const tag = event.params.tag;
    const baseUrl = event.url.origin
    if(tag != 'reading' && tag != 'read' && tag != 'to_read' && tag != 'untagged' && tag != 'favorites'){
        throw error(404, 'Not found')
    }
    let DBbookshelf;
    let bookshelf = [];
    try{
        const { data, error } = await supabaseClient.from('profiles').select('bookshelf').eq('id', session.user.id)
        if(tag != 'favorites'){
            DBbookshelf = data[0].bookshelf.filter(function (e) {
                return e.tag == tag
            })
        }else{
            DBbookshelf = data[0].bookshelf.filter(function (e) {
                return e.starred == true
            })
        }
        for(let book of DBbookshelf){
            book = await requestBook(book.id, baseUrl)
            var bookFinal = {};
            if(book.volumeInfo.imageLinks){
               bookFinal.cover = book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
            } else{
               bookFinal.cover = 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png'
            };
            bookFinal.title = book.volumeInfo.title;
            bookFinal.author = book.volumeInfo.authors[0];
            bookFinal.publisher = book.volumeInfo.publisher;
            bookFinal.year = book.volumeInfo.publishedDate.split('-')[0]
            bookFinal.url = `/books/${book.id}`
            bookshelf.push(bookFinal)
        }
        bookshelf = bookshelf.reverse()
    }catch(e){
        console.log(e)
    }
    return { bookshelf, tag }
}

async function requestBook(id, baseUrl){
    let request = await fetch(baseUrl + '/api/book?id=' + id)
    var book = await request.json()
    return book
}