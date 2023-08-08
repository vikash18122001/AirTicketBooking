const express=require('express');
const bodyParser=require('body-parser')

const app=express();
const db=require('./models/index')
const apiRoutes=require('./routes/index');
const {PORT}=require('./config/server-config');

const startServer=async ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);

    app.listen(PORT,()=>{
        if(process.env.DB_SYNC)db.sequelize.sync({alter:true});
        console.log(`server is running on port :${PORT}`);
    })
}






startServer();