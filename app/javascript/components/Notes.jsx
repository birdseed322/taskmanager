import React from "react";

function Notes(){
    const [notes,setNotes] = React.useState({
        notes:[]
    })

    React.useEffect(()=>{
        const url = "/notes"
        fetch(url).then((data) => {
            if (data.ok){
                return data.json();
            }
            throw new Error("Network error.");
        })
        .then((data) => {
            data.forEach((note) => {
                const newE1 = {
                    key: note.id,
                    id: note.id,
                    title: note.title,
                    desc: note.desc,
                    subtask: note.subtask,
                    duedate: note.duedate,
                    est: note.est
                }
    
                setNotes(prev => {
                    return {notes : [...prev.notes, newE1]};
                })
            })
        }).catch((err) => message.error("Error: " + err))
    })
    
    return(
        <ul>
        {notes.notes.map(note =>{
            return <li>{(note.title)}</li>
        })}
        </ul>
    )


}


export default Notes;