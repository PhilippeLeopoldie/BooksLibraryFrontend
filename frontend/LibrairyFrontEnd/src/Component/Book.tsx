import React, {useEffect, useState} from 'react'
 import {BookType} from '../Type'
 import FetchApi from '../FetchApi'
import PostOpinion from './PostOpinion'
 

 
function Books () {
    const [books, setBooks] = useState<BookType[]>()
    useEffect(() =>{
        FetchApi('http://localhost:5133/api/Books').then(books => setBooks(books))
    },[])
 //console.log(books?.at(Math.floor(Math.random()*books.length)))
 let random = books?.at(Math.floor(Math.random()*books.length))

    return (
        <>
        <h2>Suggestion of the day</h2>
        <h3>{random?.title}</h3>
        {
             books?.map((book, index)=>(
                <p key={index}>{book.title}{book.author}
                <PostOpinion bookId = {book.bookId}/></p>
                   
            )) 
            
        }
    </>
    )
}
 export default Books
