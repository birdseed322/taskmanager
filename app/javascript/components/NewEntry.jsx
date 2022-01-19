import React from "react"


function NewEntry(props){
    const [title, setTitle] = React.useState("")
    const [desc, setDesc] = React.useState("")
    const [subTask, setSubTask] = React.useState([])
    const [dueDate, setDueDate] = React.useState("")
    const [est, setEst] = React.useState("")
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
                        subTask: subTask,
                        dueDate: dueDate,
                        est: est
                })
            })
    
            let responseJson = await response.json();
            if (response.status === 200){
                setTitle("");
                setDesc("");
                setSubTask([]);
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
          name="note[title]"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="note[desc]"
          value={desc}
          placeholder="Description"
          onChange={(e) => setDesc(e.target.value)}
        />

        <button type="submit">Create</button>
        </form>
    )
}

export default NewEntry