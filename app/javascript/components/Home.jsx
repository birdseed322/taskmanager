import { Layout } from "antd";
import React, { useEffect } from "react";
import NewEntry from "./NewEntry";
import Notes from "./Notes";


const {Content} = Layout;

function Home(){
    const [notes,setNotes] = React.useState({
        notes:[]
    })

    function loadNotes(){
        const url = "/notes"
        fetch(url).then((data) => {
            if (data.ok){
                return data.json();
            }
            throw new Error("Network error.");
        })
        .then((data) => {
            data.map((note) => {
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
    }

    function reloadNotes(){
        setNotes({
            notes:[]
        })
        loadNotes()
    }

    //Prevent recursive renders
    React.useEffect(loadNotes,[])
    
    return (
    <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content" style={{ margin: "100px auto" }}>
            <h1>DeadLines</h1>
            <NewEntry reloadNotes = {reloadNotes}/>
            <Notes reloadNotes={reloadNotes} listOfNotes= {notes.notes}/>
            </div>
        </Content>
    </Layout>
    )


}

export default Home;