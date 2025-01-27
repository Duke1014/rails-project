import React, { useState } from 'react'


export default function SoundBox({ id, name, description, setError }) {

    const [edit, setEdit] = useState(false)
    const [nameForm, setNameForm] = useState("")
    const [descriptionForm, setDescriptionForm] = useState("")
    const [urlForm, setUrlForm] = useState("")
    
    // const handlePlay = (e) => {
    //     e.preventDefault()
    //     console.log(`${id}, ${name}, ${description}, ${sound_url}`)
    // }

    const handleEditButton = () => {
        setEdit(true)
    }

    const handleSubmit = (e) => {
        setError("")
        e.preventDefault()
        fetch(`/sounds/${id}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: nameForm,
                description: descriptionForm,
                sound_url: urlForm
             })
        }).then(setError("Sound edited successfully!"))
        .then(setEdit(false))
    }

    const handleDelete = (e) => {
        setError("")
        e.preventDefault()
        fetch(`/sounds/${id}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
            body: null
        }).then(setError("Sound deleted successfully!"))
        .then(setEdit(false))
    }

    return (
        <div>
            {edit ? <>
                <form onSubmit={handleSubmit} id={id}>
                <label>
                    {name}
                    <br/>
                    Sound Name: <input
                        type="text"
                        name="name"
                        value={nameForm}
                        onChange={e => setNameForm(e.target.value)}
                    /> <br/>
                    Sound Description: <input
                        type="text"
                        name="description"
                        value={descriptionForm}
                        onChange={e => setDescriptionForm(e.target.value)}
                    /> <br/>
                    Sound URL: <input
                        type="text"
                        name="url"
                        value={urlForm}
                        onChange={e => setUrlForm(e.target.value)}
                    />
                </label>
                <br/>    
                <button type="submit">Edit Sound</button>
            </form>
            </> : <>
                <h3>{name}</h3>
                <h4>{description}</h4>
            </>}
            {/* <button onClick={handlePlay}>►</button> */}
            <button className='edit-button' id={id} onClick={handleEditButton}>✎</button>
            <button className="delete-button" id={id} onClick={handleDelete}>🗑</button>
        </div>
    )
}
