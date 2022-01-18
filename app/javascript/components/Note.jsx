import React from "react";

function Note(props){
    return(
        <div>
            <h1>{props.title}</h1>
            <p>{props.desc}</p>
            <ul>
                {props.subtask.map((task, index)=>{
                    return <li key={index}>{task}</li>
                })}
            </ul>
            <p>{props.duedate}</p>
            <p>{props.est}</p>

        </div>
    )

}

export default Note