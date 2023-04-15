import React, { SyntheticEvent, useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { OpinionContext } from '../Context'
import FetchApi from '../FetchApi'
import check from '../media/check.png'




type opinion = {
    opinionId: number
    view: string
    userName: string
    like: number
    bookId: number | undefined

}

function OpinionUpdate() {
    const opinionUpdated= useContext(OpinionContext);
    
    const [view, setView] = useState<string>(opinionUpdated.view)
    const [userName,setUserName] = useState<string>(opinionUpdated.userName)

    const updateOpinion = async (e: SyntheticEvent) => {
        e.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json '
            },
            body: JSON.stringify({ "view": view, "userName": userName, "like": opinionUpdated.like, "bookId": opinionUpdated.bookId, })

        };
       await fetch(`https://bookslibrary.azurewebsites.net/api/Opinions/${opinionUpdated.opinionId}`, requestOptions)
            .then(response => {
                response.json().then(()=> {
                    window.location.reload();
                });
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