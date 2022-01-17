import { Layout } from "antd";
import React, { useEffect } from "react";
import Notes from "./Notes";

const {Content} = Layout;

function Home(){
    const [notes,setNotes] = React.useState({
        notes:[]
    })

    useEffect(()=>{
        const url = "/notes"
        fetch(url).then((data) => {
            if (data.ok){
                return data.json();
            }
            throw new Error("Network error.");
        })
        .then((data) => {
            data.forEach((note) => {
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
    })
    return (
    <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content" style={{ margin: "100px auto" }}>
            <h1>DeadLines</h1>
            <Notes todos={notes.notes}/>
            </div>
        </Content>
    </Layout>
    )


}

export default Home;