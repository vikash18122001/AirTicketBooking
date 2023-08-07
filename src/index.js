const express=require('express');
const bodyParser=require('body-parser')

const app=express();

const {PORT}=require('./config/server-config');

const startServer=async ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.listen(PORT,()=>{
        console.log(`server is running on port :${PORT}`);
    })
}






startServer();