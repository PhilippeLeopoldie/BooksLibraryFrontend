import React, { useEffect, useState } from 'react'
import {OpinionType} from '../Type'
import FetchApi from '../FetchApi'
import like from "../like.png"
import sad from "../sad.png"

export function FetchOpinions() {
    const [Opinions, setOpions] = useState<OpinionType[]>()
    useEffect(()=> {
        FetchApi('http://localhost:5133/api/Opinions').then(opinions => setOpions(opinions))
    },[])
    console.log(Opinions?.at(0)?.like)
    
    




  return (
    <>
    <div>Opinion</div>
    {
        Opinions?.map((opinion,index)=>(
            
            <p key={index}>opinion:{!opinion.like && <img src={sad} alt="sad"/>} Id:{opinion.bookId}
            {opinion.like && <img src={like} alt="like"/>}
            </p>
            
        ))
    }
    </>
    
  )
}

