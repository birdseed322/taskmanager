import React from 'react';


function SubTask(props){
    const text = props.st
    function handleClick(e){
        e.preventDefault()
        props.deleteSubTask(text)
    }
    return(
        <li key={props.index}>{props.st}<button onClick={handleClick}>-</button></li>
    )
}
export default SubTask