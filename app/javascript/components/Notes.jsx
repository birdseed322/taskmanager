import React from "react";
import Note from "./Note";

function Notes(props){
    


    return(
        <div>
        {props.listOfNotes.map((note) =>{
            return <Note key = {note.id} id={note.id} title={note.title} desc={note.desc} subtask = {note.subtask} duedate = {note.duedate} est = {note.est}/>
        })}
        </div>
    )


}


export default Notes;