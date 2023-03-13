import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';


export const actions = {
  join: async (event) => {
		const { session, supabaseClient } = await getSupabase(event);
		const { request, url } = event;
		const formData = await request.formData();
		const id = formData.get('id');
		
		if(!id) return fail(400, {
			error: 'Inserisci un ID valido'
		});

		const userID = session.user.id;

		const { data, error } = await supabaseClient.from('seta').select('partecipanti').eq('id', id);
		let partecipanti = data[0].partecipanti
		partecipanti.push(userID)
		const { data: data2, error: error2 } = await supabaseClient.from('seta').update({partecipanti: partecipanti}).eq('id', id);
		if(error2) return fail(500, {
			error: 'Errore nel server. Riprova più tardi'
		});

		throw redirect(303, '/group/' + id);
	},
  login: async (event) =>{
        const { request, cookies, url } = event
        const { session, supabaseClient } = await getSupabase(event)
        const formData = await request.formData()
    
        const email = formData.get('email')
        const password = formData.get('password')
    
        const { error } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        })
    
        if (error) {
          if (error instanceof AuthApiError && error.status === 400) {
            return fail(400, {
              error: 'Credenziali non valide',
              values: {
                email,
              },
            })
          }
          return fail(500, {
            error: 'Errore nel server. Riprova più tardi',
            values: {
              email,
            },
          })
        }
        if(!error){
          throw redirect(303, '/')
        }
    }
}

export const load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
  if (session) {
    let id = session.user.id

    let { data: usernameData, error:usernameError } = await supabaseClient.from('profiles').select('username').eq('id', id)
    let username = usernameData[0].username

    const baseUrl = event.url.origin
    let DBbookshelf;
    let bookshelf = [];
    const { data, error } = await supabaseClient.from('profiles').select('bookshelf').eq('id', id)
    DBbookshelf = data[0].bookshelf.filter(function (e) {
        return e.tag == 'reading'
    })
    for (let book of DBbookshelf){
      var bookFinal = {};
      bookFinal.progress = book.progress
      book = await requestBook(book.id, baseUrl)
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
      bookFinal.pages = book.volumeInfo.pageCount
      bookshelf.push(bookFinal)
    }
    bookshelf = bookshelf.reverse()
    let firstBook = bookshelf[0]
    bookshelf = bookshelf.slice(1)
    return{
      username,
      bookshelf,
      firstBook
    }
  }
}
async function requestBook(id, baseUrl){
  let request = await fetch(baseUrl + '/api/book?id=' + id)
  var book = await request.json()
  return book
}