import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { getFlows, getArchivedFlows} from '$lib/readingFlow.js';

export const load = async (event) => {
    const baseUrl = event.url.origin
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}
    let flows = await getFlows(session.user.id)
    flows = flows.reverse()
    let archivedFlows = await getArchivedFlows(session.user.id)

    let bookshelf = [];
    let books = await getBooksByTag('reading', session.user.id, supabaseClient)
    for(let book of books){
        book = await requestBook(book.id, baseUrl)
        var bookFinal = {};
        if(book.volumeInfo.imageLinks){
            bookFinal.cover = book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
        }else{
            bookFinal.cover = 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png'
        };
        bookFinal.title = book.volumeInfo.title;
        bookFinal.author = book.volumeInfo.authors[0];
        bookFinal.publisher = book.volumeInfo.publisher;
        bookFinal.year = book.volumeInfo.publishedDate.split('-')[0]
        bookFinal.url = `/books/${book.id}`
        bookFinal.id = book.id
        bookshelf.push(bookFinal)
    }
      
    bookshelf = bookshelf.reverse()

    return {
        flows,
        archivedFlows,
        bookshelf
    }
}


async function requestBook(id, baseUrl){
    let request = await fetch(baseUrl + '/api/book?id=' + id)
    var book = await request.json()
    return book
}

async function getBooksByTag(tag, id, supabaseClient){
    const { data, error } = await supabaseClient.from('profiles').select('bookshelf').eq('id', id)
    return data[0].bookshelf.filter(function (e) {
        return e.tag == tag
    })
}