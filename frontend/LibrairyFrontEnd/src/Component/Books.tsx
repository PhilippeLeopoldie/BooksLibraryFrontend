import React, {useEffect, useState} from 'react'
 import {BookType,OpinionType} from '../Type'
 import FetchApi from '../FetchApi'
import PostOpinion from './PostOpinion'
import { FetchOpinions } from './FetchOpinion'



 
function Books () {
    const [Opinions, setOpinions] = useState<OpinionType[]>()
    const [books, setBooks] = useState<BookType[]>()

    useEffect(() =>{
        FetchApi('http://localhost:5133/api/Books').then(books => setBooks(books))
        FetchApi('http://localhost:5133/api/Opinions').then(opinions => setOpinions(opinions))
    },[])
 //console.log(books?.at(Math.floor(Math.random()*books.length)))

 let random = books?.at(Math.floor(Math.random()*books.length))
 const OpinionIdToDelete =(bookId:number)=> {Opinions?.filter(opinion => opinion.bookId== bookId).at(0)} 
 
 const DeleteOpinion= async (bookId:number)=>{FetchApi(`http://localhost:5133/api/Opinions/${Opinions?.filter(opinion => opinion.bookId== bookId).at(0)?.bookId}`), {method: 'DELETE'}}
 
 const DeleteBook=async(bookid:number) => {fetch(`http://localhost:5133/api/Books/${bookid}`, {method: 'DELETE'})}

    return (
        
        <div className='bookcontainer'>
            <h2>Suggestion of the day</h2>
        <h3>{random?.title}</h3>
        {
            books?.map((book, index)=>(
                <p className='opinion' key={index}>{book.title}{book.author}
                <button type='submit' onClick={async()=>{
                    console.log('book contente',{book})
                    
                    DeleteBook(book.bookId)
                   }}>delete</button>
                
                <FetchOpinions bookId ={book.bookId}/>
                </p>
                   
            )) 
            
        }

        </div>
        
    
    )
}
 export default Books
