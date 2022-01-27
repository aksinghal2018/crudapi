const express=require('express')
const router=express.Router()
const employeemethods =require('../Controller/employeemethod')
const { body, validationResult } = require('express-validator');
const jsonwebtoken=require('jsonwebtoken')  //jwt token
const jsonsecret="5sa5sa67s66s66sa6saww"


var { randomBytes } = require('crypto');

function autenticateToken(req,res,next){
  if(req!=undefined){
  const token=req.query.token
  if(token==null){
      res.json({"err":1,"msg":"Token not match"})
  }
  else {
      jsonwebtoken.verify(token,jsonsecret,(err,data)=>{
          if(err){
              res.send("Token expired")
          }
          else {
              next();
          }
      })
  }
}
else{
  next()
}
}

router.get("/getemployee",autenticateToken,employeemethods.getData)

router.post("/addemployee",body('name').isLength({ min: 5 }),
body('salary').isLength({ min: 5 }),(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send({ errors: errors.array() });
    }
    else{
        employeemethods.addData(req,res)
    }
})
router.post("/loginemployee",body('name').isLength({ min: 5 }),
body('password').isLength({ min: 3 }),(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send({ errors: errors.array() });
    }
    else{
        employeemethods.loginEmployee(req,res)
    }
})
router.put("/updateemployee/:id",body('name').isLength({ min: 5 }),
body('salary').isLength({ min: 5 }),(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send({ errors: errors.array() });
    }
    else{
        employeemethods.updateData(req,res)
    }
})
router.get("/loginemployee",(req,res)=>{
    if (req.session.csrf === undefined) {
        req.session.csrf = randomBytes(100).toString('base64');
      }
    
      res.render('Login', { title: 'Express', csrf: req.session.csrf });
    
    
})
router.delete("/deleteemployee/:id",employeemethods.deleteData)
module.exports=router;