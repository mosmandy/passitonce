require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require('./models/userModel');

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/allusers", async(req, res)=>{
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
app.get('/allusers/:s_email', async(req, res) =>{
    try {
        const {s_email} = req.params;
        const user = await User.find({email: s_email});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
app.post("/registeruser",async(req, res)=>{
    try {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                // Store hash in your password DB.
                req.body.password = await hash;
                const user = await User.create(req.body);
                console.log(user);
                res.status(200).json(user);
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});
app.post("/userlogin",async(req, res)=>{
    try {
        const user = await User.find({email: req.body.email});
        bcrypt.compare(req.body.password, user[0].password, async function(err, result) {
            // result == true
            if (result == true) {
                res.send("User login successfully");
            }else{
                res.send("wrong email or password");
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});
// update userpassword
app.put('/updatepassword/:s_email', async(req, res) => {
    console.log(req.body);
    try {
        const {s_email} = req.params;
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                req.body.password = await hash;
                const user = await User.findOneAndUpdate({email: s_email}, req.body);
                // we cannot find any product in database
                if(!user){
                    return res.status(404).json({message: `cannot find any user with email ${s_email}`})
                }
                const updatedUser = await User.find({email: s_email});
                res.status(200).json(updatedUser);

            });
        });        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// close account by deleting user record

app.delete('/closeaccount/:s_email', async(req, res) =>{
    try {
        const {s_email} = req.params;
        const user = await User.findOneAndDelete({email: s_email});
        if(!user){
            return res.status(404).json({message: `cannot find any product with email ${s_email}`})
        }
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, ()=>{
        console.log("Server is listening on port " + process.env.PORT);
    });
})
.catch((error)=>{
    console.log(error);
});


