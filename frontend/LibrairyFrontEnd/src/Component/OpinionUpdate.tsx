import React, { useEffect, useState } from 'react'

type opinion={
    opinionId:number
    view: string
    userName:string
    like:boolean
}

function OpinionUpdate(props:opinion) {
    const[view, setView]= useState<string>(props.view)
    const[opinion, setOpinion]= useState<Object>()

    const updateOpinion =()=>{
        const  requestOptions= {
            method:'PUT',
            headers: {
            "Content-Type" : 'application/json '
            },
            body : JSON.stringify({"view": view,"userName":props.userName,"like":props.like})
            
        };
              fetch(`http://localhost:5133/api/Opinions/${props.opinionId}`,requestOptions)
             .then(response => response.json());
    }
    

    
    
    

    

  return (
    <>
    <div>OpinionUpdate</div>
    <form>
    <input placeholder='View' value ={view} onChange={(e)=> setView(e.target.value)}/>
    <button onClick={updateOpinion}></button>
    </form>
    </>
    
  )
}

export default OpinionUpdate