import React from "react";
import Note from "./Note";

function Notes(){
    const [notes,setNotes] = React.useState({
        notes:[]
    })

    function loadNotes(){
        const url = "/notes"
        fetch(url).then((data) => {
            if (data.ok){
                return data.json();
            }
            throw new Error("Network error.");
        })
        .then((data) => {
            data.map((note) => {
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
    }

    function reloadNotes(){
        setNotes({
            notes:[]
        })
        loadNotes()
    }

    //Prevent recursive renders
    React.useEffect(loadNotes,[])


    return(
        <div>
        {notes.notes.map((note) =>{
            return <Note key = {note.id} id={note.id} title={note.title} desc={note.desc} subtask = {note.subtask} duedate = {note.duedate} est = {note.est}/>
        })}
        </div>
    )


}


export default Notes;