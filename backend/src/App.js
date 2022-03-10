const express = require('express')
const app = express()
const port = process.env.PORT || 5000
port2 = 5001
const cors = require("cors")
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser")
const mAppointments = require("./model/appointments.js")
const mUsers = require("./model/users.js")

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//app.use(cors())
app.use(cookieParser())

const db = require("./config/Database")
const jwt = require("jsonwebtoken")
const jwtKey = "CHANGEMEIMNOTSECURE"
const frontEnd = "http://localhost:3000"
var cookie = require('cookie')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", frontEnd);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



function generateToken(username,userID){
  const user = {name: username, id: userID}
  const accessToken = jwt.sign(user,jwtKey)
  return accessToken
}

function authenticateToken(req,res,next){

  if(req == null || req.cookies == undefined) return 
  const token = req.cookies['accessToken']

  if(token == null || req.cookies == undefined) return res.send("NO_TOKEN")
  jwt.verify(token, jwtKey,(err,user)=>{
    if(err) return res.send("WRONG_TOKEN")
    req.user = user
    next()
  })
  
}


const getDates = (startDate, stopDate) => {
  var dateArray = [];
  var currentDate = startDate;
  while (currentDate <= stopDate) {
      dateArray.push(new Date (currentDate));
      currentDate.setDate(currentDate.getDate() +1)
  }
  return dateArray;
}

const makeCalendarObjects = (month,year) => {

  month = parseInt(month)
  year = parseInt(year) 

  var dateEnd = new Date(year,month,1)

  var currDate = new Date()
  var dateStart = new Date(year,month,1)
  

  
  dateStart.setDate(dateStart.getDate() -1)
  dateEnd.setDate(dateEnd.getDate() + 33)
  

  console.log("startDate: " + dateStart + "\nendDate: " + dateEnd)
  var dates = getDates(dateStart, dateEnd);
  console.log(dates)


  return dates
}

app.post("/getDates",async (req,res,next)=>{
  console.log(req.body)
  const month = req.body.month
  const year = req.body.year
  console.log("Month: " + month + "\nYear: " + year)
  res.json(makeCalendarObjects(month,year))
  
  })

  app.post("/createAppointment",authenticateToken,async (req,res,next)=>{
    const userID = req.user.id
    console.log("createAppointment")
    console.log(req.body)
    console.log("userID:" + userID)
    var workload = 0
    var description = ""
    if(req.body.workload) workload = parseInt(req.body.workload)
    if(req.body.description) description = req.body.description

    if(!req.body.name || !req.body.startDate || !req.body.endDate) return "ERR_INPUT_MISSING"

    res.send(await mAppointments.insertUserAppointment(userID,req.body.name,req.body.startDate,req.body.endDate,workload,description))
    })

app.get("/checkAuth",authenticateToken,(req,res)=>{

res.json({auth:true,user:req.user})
})

app.post("/getAppointments",authenticateToken,async(req,res,next)=>{
  const userID = req.user.id

 

  res.json(await mAppointments.getUserAppointments(userID))
 
  


})

app.post("/Login", async (req,res) => {
  const {email,password} = req.body
  
  var result = await mUsers.getUserByEmail(email)

  if(result.length < 1) return res.json({auth: false, msg: "UserNamePasswordError"})
  const validPassword = await bcrypt.compare(password, result[0].Password);

  if(!validPassword) return res.json({auth: false, msg: "UserNamePasswordError"})
  const accessToken = generateToken(email,result[0].idUser)

  res.status(202)
      .cookie("accessToken", accessToken,{sameSite: 'strict',
  path: '/',
  expires: new Date(new Date().getTime() + 604800 * 1000),
  httpOnly: true}).send({auth: true, msg: "CookieInitializing"})
      
})

app.get("/Logout",(req,res)=>{
  res.cookie("accessToken", "None",
  {
  sameSite: 'strict',
  path: '/',
  expires: new Date(0),
  httpOnly: true
  }).send("LOGOUT_SUCCESS")
})





app.use(function (err, req, res, next) {
  res.send(err.code)
})




app.listen(port,'0.0.0.0', () => {
  console.log(`Backend listening at http://localhost:${port}`)
})