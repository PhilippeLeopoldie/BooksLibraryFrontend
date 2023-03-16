import React, { useEffect, useState } from 'react'


type BookType = {
    bookId:number
}
type Opinion = {
    like : boolean
    bookId: number
    //userId: number
}

function PostOpinion(props:BookType) {

    const[like, setLike]= useState<boolean>()
    const[opinion, setOpinion]= useState<Opinion>(Object)
    

    const PostOpinion = () => {
        const requestOptions = {
            method : 'POST',
            header: {
                'accept': 'text/plain',
                "Content-Type" : 'application/json',
            },
            body : JSON.stringify({bookId: props.bookId,like : true})
        };
        console.log(requestOptions);
        fetch("http://localhost:5133/api/Opinions",requestOptions)
        
    }

  return (
    <>
    <div>PostOpinion</div>
    <button onClick={PostOpinion}>Like</button>
    </>
  )
}

export default PostOpinion



