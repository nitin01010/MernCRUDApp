const express = require("express");
const server = express();
let port = 3000;
const path = require("path");

const { v4:uuidv4 } = require("uuid");
const methodoverride = require("method-override"); 
server.use(methodoverride('_method'));

server.use(express.json());
server.use(express.urlencoded({extended:"false"}));

server.set('views engine','ejs');
server.set('views',path.join(__dirname,'./views'));
server.use(express.static(path.join(__dirname,'./public')));

let posts = [
    {   id:uuidv4(),
        username:'apnacollege',
        content:'Hard Work is importente to achive succes'
    },
    {
        id:uuidv4(),
        username:'chai aur code',
        content:'chai aur code with Learing REST API'
    },
    {
        id:uuidv4(),
        username:'CollegeWala',
        content:'Work on Your Self To Achive sussces'
    }
];

server.get("/",async(req,res)=>{
    try{
        res.render("index.ejs",{posts});
    }catch(error){
        res.render(`there is one ${error}`);
    }
});

server.get("/post/:id/edit",async(req,res)=>{
    try{
        const {id} = req.params;
        const findnew = posts.find((p)=> id === p.id);
        res.render("edit.ejs",{findnew});
    }catch(error){
        res.render(`there is one ${error}`);
    }
});

server.get("/new/posts",async(req,res)=>{
    try{
        res.render("new.ejs");
    }catch(error){
        res.render(`there is one ${error}`);
    }
});

server.get("/delete/:id",(req,res)=>{
    try{
        const {id} = req.params;
        const fin = posts.find((p)=> id == p.id);
        res.render("show.ejs",{fin});
    }catch(error){
        res.send(`there is one ${error}`);
    }
});


server.post("/api/posts",(req,res)=>{
    try{
        let {username,content} = req.body;
        let id = uuidv4();
        posts.push({id,username,content});
        console.log(posts);
        res.redirect("/");
    }catch(error){
        res.send(`there is one ${error}`);
    }
});

server.patch("/post/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        console.log(id);
        let newContent = req.body.content;
        console.log(newContent);
        const findPost = posts.find((p)=> id === p.id );
        findPost.content = newContent;
        res.redirect("/");
    }catch(error){
        res.send(`there is one ${error}`);
    }
});

server.delete("/posts/:id",async(req,res)=>{
    try{
        let {id} = req.params;
        posts = posts.filter((e)=> id !== e.id);
        res.redirect("/");
    }catch(error){
        res.send(`there is one ${error}`);
    }
});



server.listen(port,(error)=>{
    console.log(`server is ruing ${port} and error is ${error}`);
})