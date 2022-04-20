const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers")
const bcrypt = require("bcryptjs");

// this will convert json format .
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const port = process.env.port || 3000;

const static_path= path.join(__dirname,"../public");
app.use(express.static(static_path));

const templatePath = path.join(__dirname,"../templates/views");
const partialPath = path.join(__dirname,"../templates/partials");
app.set("view engine","hbs");
app.set("views",templatePath);
hbs.registerPartials(partialPath);

app.get("/" , (req,res) => {
    res.render("index")
});
app.get("/register" , (req,res) => {
    res.render("register")
});
app.get("/login" , (req,res) => {
    res.render("login")
});

app.post("/register" , async (req,res) => {
    try{
       const password = req.body.password;
       const cpassword = req.body.confirmpassword;
       if(password===cpassword){
         
        const registerStudent = new Register({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            gender : req.body.gender,
            phone : req.body.phone,
            password : password,
            confirmpassword : cpassword
        })

       const token= await registerStudent.generateAuthToken();       
         // Password Hash in collection page above it.
           
        const registered = await registerStudent.save();
        res.status(201).render("index");
       }
       else{
           res.send("password are not matching");
       }

    } catch(e){
        res.status(400).send(e);
    }   
});

// login check

app.post("/login" , async (req,res) => {
    try{
       const password = req.body.password;
        const email = req.body.email;

        const useremail = await Register.findOne({email:email});

        const isMatch = await bcrypt.compare(password,useremail.password);

        if(isMatch){
            res.status(201).render("index");
        }
        else{
            res.send("Invalid login Details");
        }
    } catch(e){
        res.status(400).send("Invalid login Details");
    }   
});

// const jwt=require('jsonwebtoken');

// const createToken=async()=> {
//   const token=await jwt.sign({id:"620a3d07c66bff959fa39e59"},"abhaysinghrathaurabchderyfoytfsdj",{
//       expiresIn:"2 minutes"});
//   console.log(token);

//   const userVer=await jwt.verify(token,"abhaysinghrathaurabchderyfoytfsdj");
//   console.log(userVer);
// }

// createToken();


 app.listen(port,()=>{
     console.log(`server is running at port no.${port}`); })