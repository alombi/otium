import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}
    const baseUrl = event.url.origin
    let DBbookshelf;
    let bookshelf = [];
    try{
        const { data, error } = await supabaseClient.from('profiles').select('bookshelf').eq('id', session.user.id)
        DBbookshelf = data[0].bookshelf.filter(function (e) {
            return e.tag == 'reading'
        })
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
	return {
		user: session.user,
        bookshelf
	};
};


async function requestBook(id, baseUrl){
    let request = await fetch(baseUrl + '/api/book?id=' + id)
    var book = await request.json()
    return book
}