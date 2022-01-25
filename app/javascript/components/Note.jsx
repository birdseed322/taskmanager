import React from "react";
import { useNavigate } from "react-router-dom";

function Note(props){

    //Navigate used to redirect to task specific page
    const navigate = useNavigate();
    const id = props.id;

    //Function to handle deletion of note by sending delete request to specific id. If successful, home page reloads to display update.
    function deleteNote(e){
        e.preventDefault();
        const url = "/notes/" + id;
        try{
            fetch(url, {
                method:"DELETE"
            })
            .then((res)=>{
                if (res.status === 200){
                    props.reloadNotes()
                }
            })
        } catch (err){
            console.log(err)
        }
    }
    
    //Function to redirect user to the specified task page
    function handleExpansion(){
        navigate("/display_note/" + id)
    }

    
    //Function to calculate number of days left to selected due date, starting from today.
    function daysLeft(dueDate){
        const today = new Date()
        const due = new Date(dueDate)
        const diff = Math.ceil((due.getTime() - today.getTime())/(1000 * 3600 * 24))
        return "Days left: " + diff
    }
    return(
        <div className="note">
            <h1 className="note-title">{props.title}</h1> <button className="close-note" onClick={deleteNote}>x</button>
            <p className="note-description">{props.desc}</p>
            <ul>
                {props.subtask.map((task, index)=>{
                    return <li key={index}>{task}</li>
                })}
            </ul>
            <p className="note-days-left">{daysLeft(props.duedate)}</p>
            <button className="expand-note" onClick={handleExpansion}>Expand</button>

        </div>
    )

}

export default Note