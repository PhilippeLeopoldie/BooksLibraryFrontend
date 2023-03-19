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


    const updateOpinion = (e: SyntheticEvent) => {
        e.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json '
            },
            body: JSON.stringify({ "view": view, "userName": props.userName, "like": props.like, "bookId": props.bookId, })

        };
        fetch(`http://localhost:5133/api/Opinions/${props.opinionId}`, requestOptions)
            .then(response => {
                response.json();

            });
    }





    return (
        <>
            <form>
                <input placeholder='View' value={view} onChange={(e) => setView(e.target.value)} />
                <button onClick={updateOpinion}><img src={check} /></button>
            </form>
        </>

    )
}

export default OpinionUpdate