const express = require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const Usermodel=require('./userModel.jsx')

const app=express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb+srv://madhawaawishka:admin@cluster99.2vphe.mongodb.net/demo',)
    .then(() => {
        console.log('Connected to MongoDB');})
    .catch(err => {
    console.log('Failed to connect to MongoDB', err);
});


app.listen(3001,()=>{
    console.log("server is running on port 5000")
})


app.post("/createuser",(req,res) => {
    Usermodel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.get('/',(req,res) => {
    Usermodel.find({})
    .then(users => res.json(users))
    .catch(err => console.log(err))
})



app.get('/getuser/:id',(req,res) => {
    const id=req.params.id;
    Usermodel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => console.log(err))
})


app.put('/updateuser/:id',(req,res) => {
    const id=req.params.id;
    Usermodel.findByIdAndUpdate({_id:id},
    {name:req.body.name,email:req.body.email,age:req.body.age})
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

app.delete('/deleteuser/:id',(req,res) => {
    const id=req.params.id;
    Usermodel.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
    .catch(err => console.log(err))
})