import React from 'react';


function SubTask(props){
    const text = props.st
    function handleClick(e){
        e.preventDefault()
        props.deleteSubTask(text)
    }
    return(
        <li className="new-note-subtask-item" key={props.index}>{props.st}<button onClick={handleClick} className="new-note-subtask-item-delete">-</button></li>
    )
}
export default SubTask