import react from 'react';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import SubTask from './SubTask'


function UpdateNote(){

    //params variable use to capture paramater in URL, which will be used to send GET request to appropriate note id route, to retrieve the note specific information.
    const params = useParams();
    const url = '/notes/' + params.id;
    const navigate = useNavigate();
    const [title, setTitle] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [subTask, setSubTask] = React.useState("");
    const [subTasks, setSubTasks] = React.useState({
        subTasks:[]
    });
    const [dueDate, setDueDate] = React.useState("");
    const [est, setEst] = React.useState("");
    
   
    function handleReturnHome(){
        navigate('/');
    }

    function deleteSubTask(text){
        const newSubTasks = subTasks.subTasks.filter((st)=>{
            return st !== text;
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
        });
        setSubTask("");
    }

    //Function to load notes. Done by launching GET request to specific note id route, using the id in the param 
    async function loadNote(){
        const note = await fetch(url).then((res)=>{
            return res.json()
        }).then((response)=>{
            console.log(response)
            //Response is captured to be displayed in the notes
            setTitle(response.title)
            setDesc(response.desc)
            setSubTasks({
                subTasks:response.subtask
            })
            setDueDate(response.duedate)
            setEst(response.est)
        })
    }

    //Function to submit task information to API through a PATCH request to update the information in the DB. After which, user is redirected back to root page
    async function handleUpdate(e){
        e.preventDefault()
        const update = fetch(url, {
            method: "PATCH",
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
        }).then(()=>{
            handleReturnHome()
        })
    }
    
    //Allow note information to be rendered
    React.useEffect(()=>{
        loadNote()
    },[])

    return (
        <div>
        <button onClick={handleReturnHome} className='link-to-home'>Return to Notes</button>
        <form className="new-note-form">
        <input
          type="text"
          className="new-note-title"
          name="title"
          value={title}
          placeholder={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="new-note-description"
          name="desc"
          value={desc}
          placeholder= {desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <label className="new-note-due-date-label">Due date: </label><input type="text"  className="new-note-due-date" name="duedate" value={dueDate} onFocus={(e)=>(e.target.type = "date")} onBlur={(e)=>(e.target.type = "text")} placeholder={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
        <input type="number" className="new-note-est" name="est" value={est} placeholder={est} onChange={(e)=>setEst(e.target.value)} />
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
            {subTasks.subTasks.map((st, index)=>{
                return <SubTask key={index} index={index} st={st} deleteSubTask={deleteSubTask}/>
            })}
        </ul>


        <button type="submit" onClick={handleUpdate}>Update</button>
        </form>
        </div>
    )
}

export default UpdateNote