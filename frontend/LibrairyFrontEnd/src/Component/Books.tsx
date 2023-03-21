import React, {useEffect, useState} from 'react'
 import {BookType,OpinionType} from '../Type'
 import FetchApi from '../FetchApi'

import { FetchOpinions } from './FetchOpinion'
import trash from '../trash.png'



 
function Books () {
    const [Opinions, setOpinions] = useState<OpinionType[]>()
    const [books, setBooks] = useState<BookType[]>()

    useEffect(() =>{
        FetchApi('http://localhost:5133/api/Books').then(books => setBooks(books))
        FetchApi('http://localhost:5133/api/Opinions').then(opinions => setOpinions(opinions))
    },[])
 //console.log(books?.at(Math.floor(Math.random()*books.length)))

 let random = books?.at(Math.floor(Math.random()*books.length))
 const OpinionIdToDelete =(bookId:number)=> {Opinions?.filter(opinion => opinion.bookId== bookId).at(0)?.bookId.toString()} 
 console.log('OpinionId to delete :',{OpinionIdToDelete})
 
 const DeleteOpinion= async (bookId:number)=>{fetch(`http://localhost:5133/api/Opinions/${bookId}`, {method: 'DELETE'})}
 
 const DeleteBook= async (bookId:number) => {fetch(`http://localhost:5133/api/Books/${bookId}`, {method: 'DELETE'})}


    return (
        
        <div className='bookcontainer'>
            <h2>Recommandation of the day</h2>
        <h3>{random?.title}</h3>
        {
            books?.map((book, index)=>(
                <p className='opinion' key={index}>{book.title}  {book.author}
                <button type='submit' onClick={async()=>{
                     
                    //await DeleteOpinion(book.bookId)
                    
                    await DeleteBook(book.bookId)
                    
                    // window.location.reload()
                   }}><img src={trash}/></button>
                
                <FetchOpinions bookId ={book.bookId}/>
                </p>
                   
            )) 
            
        }

        </div>
        
    
    )
}
 export default Books
