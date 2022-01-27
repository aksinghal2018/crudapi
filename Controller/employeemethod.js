const bcrypt = require('bcrypt');           //password encyption
const saltRounds = 10;
const employeeModel=require('../db/employeeSchema')
const jsonwebtoken=require('jsonwebtoken')  //jwt token
const jsonsecret="5sa5sa67s66s66sa6saww"
 const getData=async (req,res,next)=>{
    await employeeModel.find({},(err,data)=>{
        if(err) throw err;
        res.json({data:data});
    })
}
 const addData= (req,res,next)=>{
     
    bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
        if (err) throw err
        req.body.password=hash
        let ins=new employeeModel(req.body);
         await ins.save((err)=>{
           if(err){ res.json({err:"already added",message:"employee already added"})}
           else{
           res.json({data:req.body,err:"",message:"employee added successfully"});
           }
       })
    
    })
}

 const updateData=async (req,res,next)=>{
        const id=req.params.id
        employeeModel.updateOne({_id:id},{$set:req.body},(err)=>{
            if(err){ res.json({err:"already added",message:"employee already added"})}
            else {
                res.json("employee data Updated .");
            }
        })
}
 const deleteData=async (req,res,next)=>{
    await employeeModel.deleteOne({_id:req.params.id},(err)=>{
        if(err) throw err 
        res.json("employee Data Deleted .")
    })
}
const loginEmployee= (req,res,next)=>{
    let token=jsonwebtoken.sign({ UID:req.body.name },jsonsecret,{ expiresIn: 60*60 })
    if(req.session.csrf==req.body.csrf){
        console.log("csrf match")
    }
    else{
        
        console.log(req.session.csrf)
    }
    employeeModel.find({$and:[{name:req.body.name}]},(err,data)=>{
        bcrypt.compare(req.body.password, data[0].password, function(err, result) {
            if(!result){
                
                    res.json({err:err,message:"incorrect username And password."})
                    
                }
                else{
                    console.log(data)
                res.json({data:data,err:"",token:token});
                console.log(token)
            }
        });
    })
}

module.exports={
    getData,addData,updateData,deleteData,loginEmployee
}