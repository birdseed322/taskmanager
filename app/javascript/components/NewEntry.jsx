
import React from "react"
import SubTask from './SubTask';

function NewEntry(props){
    const [title, setTitle] = React.useState("")
    const [desc, setDesc] = React.useState("")
    const [subTask, setSubTask] = React.useState("")
    const [subTasks, setSubTasks] = React.useState({
        subTasks:[]
    })
    const [dueDate, setDueDate] = React.useState("")
    const [est, setEst] = React.useState("")
    function addSubTask(e){
        e.preventDefault();
        setSubTasks((prev)=>{
            return {
                subTasks:[...prev.subTasks, subTask]
            }
        })
        setSubTask("")
    }

    function deleteSubTask(text){
        const newSubTasks = subTasks.subTasks.filter((st)=>{
            return st !== text
         })
        setSubTasks({
            subTasks: newSubTasks
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        const url = "/notes"
        try{
            let response = await fetch(url,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body:JSON.stringify({
                    title:title,
                    desc: desc,
                    subtask: subTasks.subTasks,
                    duedate: dueDate,
                    est: est
                })
            })
    
            let responseJson = await response.json();
            if (response.status === 200){
                setTitle("");
                setDesc("");
                setSubTasks({
                    subTasks:[]
                });
                setDueDate("");
                setEst("");
                props.reloadNotes();
            } else {
                console.log("error!");
            }
        } catch (err) {
            console.log(err);
        }
        

    }

    return(
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="desc"
          value={desc}
          placeholder="Description"
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="text"
          name="subtask"
          value={subTask}
          placeholder="Add Subtask"
          onChange={(e) => setSubTask(e.target.value)}
        />
        <button onClick={addSubTask}>+</button>
        <ul>
            {subTasks.subTasks.map((st, index)=>{
                return <SubTask key={index} index={index} st={st} deleteSubTask={deleteSubTask}/>
            })}
        </ul>


        <button type="submit">Create</button>
        </form>
    )
}

export default NewEntry