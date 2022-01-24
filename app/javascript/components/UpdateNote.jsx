import react from 'react';
import React from 'react';
import { useParams } from 'react-router-dom'
import SubTask from './SubTask'


function UpdateNote(){
    const params = useParams()
    const url = '/notes/' + params.id
    const [title, setTitle] = React.useState("")
    const [desc, setDesc] = React.useState("")
    const [subTask, setSubTask] = React.useState("")
    const [subTasks, setSubTasks] = React.useState({
        subTasks:[]
    })
    const [dueDate, setDueDate] = React.useState("")
    const [est, setEst] = React.useState("")
    const [noteData, setNoteData] = React.useState({
        title:"",
        desc: "",
        subtasks: [],
        duedate: "",
        est: ""
    })
    function handleSubmit(e){
        console.log(e)
    }
    function deleteSubTask(text){
        const newSubTasks = subTasks.subTasks.filter((st)=>{
            return st !== text
         })
        setSubTasks({
            subTasks: newSubTasks
        })
    }

    function addSubTask(e){
        e.preventDefault();
        setSubTasks((prev)=>{
            return {
                subTasks:[...prev.subTasks, subTask]
            }
        })
        setSubTask("")
    }
    async function loadNote(){
        const note = await fetch(url).then((res)=>{
            return res.json()
        }).then((response)=>{
            console.log(response)
            setNoteData({
                title:response.title,
                desc: response.desc,
                subtasks: response.subtask,
                duedate: response.duedate,
                est: response.est
            })
        })
    }
    

    React.useEffect(()=>{
        loadNote()
    },[])

    return (
        <form className="new-note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-note-title"
          name="title"
          value={noteData.title}
          placeholder={noteData.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="new-note-description"
          name="desc"
          value={noteData.desc}
          placeholder= {noteData.desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <label className="new-note-due-date-label">Due date: </label><input type="date" className="new-note-due-date" name="duedate" value={noteData.dueDate} placeholder={noteData.dueDate} onChange={(e)=>setDueDate(e.target.value)} />
        <input type="number" className="new-note-est" name="est" value={noteData.est} placeholder={noteData.est} onChange={(e)=>setEst(e.target.value)} />
        <input
          type="text"
          className="new-note-subtask"
          name="subtask"
          value={subTask}
          placeholder="Add Subtask"
          onChange={(e) => setSubTask(e.target.value)}
        />
        <button onClick={addSubTask}>+</button>
        <ul className="new-note-subtasks">
            {noteData.subtasks.map((st, index)=>{
                return <SubTask key={index} index={index} st={st} deleteSubTask={deleteSubTask}/>
            })}
        </ul>


        <button type="submit">Create</button>
        </form>
    )
}

export default UpdateNote