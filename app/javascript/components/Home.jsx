import { Layout } from "antd";
import React, { useEffect } from "react";
import Input from "./Input";
import Notes from "./Notes";


const {Content} = Layout;

function Home(){
    
    return (
    <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content" style={{ margin: "100px auto" }}>
            <h1>DeadLines</h1>
            <Input/>
            <Notes/>
            </div>
        </Content>
    </Layout>
    )


}

export default Home;