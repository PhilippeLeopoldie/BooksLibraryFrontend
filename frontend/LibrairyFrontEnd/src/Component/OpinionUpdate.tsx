import React, { SyntheticEvent, useEffect, useState } from 'react'
import FetchApi from '../FetchApi'
import check from '../check.png'

type opinion = {
    opinionId: number
    view: string
    userName: string
    like: boolean
    bookId: number

}

function OpinionUpdate(props: opinion) {
    const [view, setView] = useState<string>(props.view)
    const [userName,setUserName] = useState<string>(props.userName)

    const updateOpinion = (e: SyntheticEvent) => {
        e.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json '
            },
            body: JSON.stringify({ "view": view, "userName": userName, "like": props.like, "bookId": props.bookId, })

        };
        fetch(`https://bookslibrary.azurewebsites.net/api/Opinions/${props.opinionId}`, requestOptions)
            .then(response => {
                response.json();
            });
    }





    return (
        <>
            <form className="opinioncard">
                <label>view:  
                    <input placeholder='View' value={view} onChange={(e) => setView(e.target.value)} />
                </label>
                <label>UserName: 
                    <input placeholder='Username' value= {userName} onChange={(e)=> setUserName(e.target.value)}/>
                </label>
                <button onClick={updateOpinion}><img src={check} /></button>
            </form>
        </>

    )
}

export default OpinionUpdate