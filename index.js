const express=require('express');
const path=require("path");
const app=express();
const fs=require('fs');
const { Console } = require('console');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.get("/",function(req,res) {
    fs.readdir(`./files`,function(err,files){
        res.render('index',{files:files});
    })
})

app.get("/files/:filename",function(req,res) {
    const filePath=path.join(__dirname,"files",req.params.filename);
    fs.readFile(filePath,"utf-8", function(err,filedata) {
        res.render("show",{filename: req.params.filename, fileData:filedata});
    })
})

app.post("/create",function(req,res) {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect("/");
    })
})

// app.post("/files/:filename", function (req, res) {
//     const filePath = path.join(__dirname, "files", req.params.filename);
//     fs.unlink(filePath, function (err) {
//         if (err) {
//             return res.status(404).send("No such file existed!!");
//         }
//         res.redirect("/");
//     });
// });

// app.patch("/files/:filename",function(req,res){
//     const filePath=path.join(__dirname,"files",req.params.filename);
//     fs.writeFile(filePath, req.body.newContent, function (err) {
//         if (err) {
//             return res.status(500).send("Error updating file!");
//         }
//         res.redirect(`/files/${req.params.filename}`);
//     });
// })
app.listen(3000);

