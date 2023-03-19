import React, { useEffect, useState } from 'react'
import FetchApi from '../FetchApi'


type BookType = {
    bookId:number
}
type Opinion = {
    like : boolean
    bookId: number
    view : string

    //userId: number
}

function PostOpinion(props:BookType) {

    const [Opinions, setOpinions] = useState<Opinion[]>()

    const PostOpinion = () => {
        const requestOptions = {
            method : 'POST',
            headers: {
                "Content-Type" : 'application/json',
            },
            body : JSON.stringify({bookId: props.bookId,like : true})
        };
        console.log(requestOptions);
        fetch("http://localhost:5133/api/Opinions",requestOptions)

        const [Opinions, setOpinions] = useState<Opinion[]>()
    useEffect(()=> {
        FetchApi('http://localhost:5133/api/Opinions').then(opinions => setOpinions(opinions))
        console.log('',Opinions)
    },[])
    }
    const opinion= Opinions?.filter(opinion => opinion.bookId == props.bookId)
    
    const DeleteOpinion=async() => {fetch(`http://localhost:5133/api/Opinions/${opinion?.at(0)?.bookId}`, {method: 'DELETE'})}



  return (
    <>
    <div>PostOpinion</div>
    </>
  )
}

export default PostOpinion

