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
const mCourses = require("./model/courses.js")
const mOccupiedDays = require("./model/occupiedDays.js")
const helpers = require("./helpers.js")
const url = require('url')
const { spawn } = require('promisify-child-process');


const {google} = require('googleapis')
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_KEY,
  process.env.GOOGLE_SECRET,
  "http://localhost:5000/google/callback"
);

const scopes = [
  'https://www.googleapis.com/auth/calendar.readonly'
];

const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  /** Pass in the scopes array defined above.
    * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true
});


//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//app.use(cors())
app.use(cookieParser())
//app.use(passport.initialize())
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



function generateToken(username,userID,userRole){
  const user = {name: username, id: userID, role:userRole}
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
  var currentDate = new Date(startDate);
  stopDate = new Date(stopDate)
  while (currentDate <= stopDate) {
      dateArray.push(new Date (currentDate));
      currentDate.setDate(currentDate.getDate() +1)
  }
  return dateArray;
}

const generateCalendarObjects = (month,year) => {

  month = parseInt(month)
  year = parseInt(year) 

  var dateEnd = new Date(year,month,1)

  var currDate = new Date()
  var dateStart = new Date(year,month,1)
  
  
  dateStart.setDate(dateStart.getDate() -1)
  dateEnd.setDate(dateEnd.getDate() + 33)
  

  console.log("startDate: " + dateStart + "\nendDate: " + dateEnd)
  var dates = getDates(dateStart, dateEnd);
  var calendarObjects = []

  for(i in dates){
    let obj = {date:dates[i],workload:0}
    calendarObjects.push(obj)
  }

  console.log(calendarObjects)


  return calendarObjects
}




const generateWorkloadDistribution = async (startDate,endDate,workload) => {
  var start = new Date(startDate)
  var end = new Date(endDate)

  const days = helpers.getDaysBetween(start,end)
  const daysUntilDeadline = days.length




  var {stdout} = await spawn('python',["./controller/distributeWorkload.py",
  workload,
  daysUntilDeadline],{encoding: 'utf8'} );



  let workloadArray = await stdout.split(',')
    

  workloadArray  = workloadArray.map((x) =>parseFloat(x));
    console.log("workloadArray:")
    console.log(workloadArray)

    var distro = []
    for(i in days){
      let obj = {date:days[i],workload:workloadArray[i]}
      distro.push(obj)
    }
    return distro

  
}

app.get("/test",async (req,res)=>{
  console.log("authURL:" + authorizationUrl)
  res.send('<a href="/auth/google">Google Auth</a>') 
  })

app.get("/auth/google",authenticateToken,(req,res,next)=>{
  res.writeHead(301, { "Location": authorizationUrl })
  res.end()
}

  
  )


app.post("/getExternalAppointments",async (req,res,next)=>{
  const code = req.body.code
  console.log("getExternalAppointments called")
  let { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  let events = await listEvents(oauth2Client)
  console.log("events:")
  console.log(events)
  res.json(events)
  //res.events = events
  //res.redirect('http://localhost:3000/')
})



app.get("/google/callback",async (req,res,next)=>{
  let callback_url = new URL('http://localhost:5000' + req.url)
  let callback_params = callback_url.searchParams;
  if(callback_params.get('error')) return res.send("ERROR: " + callback_params.get('error'))
  //if(callback_params.get('code')) return res.send("Code: " + callback_params.get('code'))

  // Get access and refresh tokens (if access_type is offline)

  let encodedCode = encodeURIComponent(callback_params.get('code'))
  return res.redirect('http://localhost:3000/?code=' + encodedCode)
})


  

  function listEvents(auth) {
    const calendar = google.calendar({version: 'v3', auth});
    var events;
    return new Promise((resolve, reject) => {
    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 99999999,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('API_ERR:' + err);
      events = res.data.items;
      resolve(events)
    });
  });

  }

    app.get("/success",async (req,res,next)=>{
      console.log("GOOGLE LOGIN SUCCESS, REQ:")
      console.log(req)
      res.send("SUCCESS")
    })

    app.get("/failure",async (req,res,next)=>{
      console.log("GOOGLE LOGIN FAILURE, REQ:")
      console.log(req)
      res.send("FAILURE")
    })


 
    
 

    app.post("/algoTest",async (req,res,next)=>{
      console.log("algoTest called")

      const startDate = new Date(req.body.startDate)
      const endDate = new Date(req.body.endDate)
      const workload = parseInt(req.body.workload)
      
      let results = undefined
      
        results = await generateWorkloadDistribution(startDate,endDate,workload)
      
      
      
      res.json(results)
      

      
      })





app.post("/getDates",authenticateToken,async (req,res,next)=>{
  console.log("getDates called")
  const userID = req.user.id
  const userRole = req.user.role
  const month = req.body.month
  const year = req.body.year
  const courseID = req.body.courseID
  console.log("Month: " + month + "\nYear: " + year)
  let calendarObjects = generateCalendarObjects(month,year)
  console.log("calendarObjects")
  console.log(calendarObjects)
  console.log("LAST DATE:")
  console.log(calendarObjects[calendarObjects.length-1].date)
  let occDays;
  if(userRole==0) occDays = await mOccupiedDays.getUserOccDays(userID,calendarObjects[0].date,calendarObjects[calendarObjects.length-1].date)
  if(userRole==1) occDays = await mOccupiedDays.getCourseOccDays(courseID,calendarObjects[0].date,calendarObjects[calendarObjects.length-1].date) 
  console.log("occDays")
  console.log(occDays)

  
  for(let i=0;i<calendarObjects.length;i++){
    calendarObjects[i].appointments = []
    for(let j=0;j<occDays.length;j++){
      if((new Date(occDays[j].Date)).getTime() === (new Date(calendarObjects[i].date)).getTime()){
        calendarObjects[i].workload += occDays[j].Workload
        calendarObjects[i].appointments.push({idAppointment:occDays[j].idAppointment,Workload:occDays[j].Workload})
      }
    }
    console.log("calendarObject " + i + ": ")
    console.log(calendarObjects[i])
    console.log("appointments:")
    console.log(calendarObjects[i].appointments)
  }
  console.log("combinedCalendarObjects")
  console.log(calendarObjects)

  res.json(calendarObjects)
  
  })




  app.post("/createAppointment",authenticateToken,async (req,res,next)=>{

    const userID = req.user.id
    var workload = 0
    var description = ""
    if(req.body.workload) workload = parseFloat(req.body.workload)
    if(req.body.description) description = req.body.description
    if(!req.body.name || !req.body.startDate || !req.body.endDate) return "ERR_INPUT_MISSING"

    let createdAppointment= await mAppointments.insertUserAppointment(userID,req.body.name,req.body.startDate,req.body.endDate,workload,description)


    let distro;
    if(createdAppointment && createdAppointment.idAppointment){
      distro = await generateWorkloadDistribution(createdAppointment.StartDate,createdAppointment.EndDate,createdAppointment.Workload)
    }

    for(let i=0;i<distro.length;i++){

      distro[i].userID = userID
      distro[i].appointmentID = createdAppointment.idAppointment
      distro[i].courseID = createdAppointment.idCourse || null
    }

    let occDayResult = await mOccupiedDays.insertOccupiedDays(distro)

    res.send(createdAppointment)
    })

app.get("/checkAuth",authenticateToken,(req,res)=>{

res.json({auth:true,user:req.user})
})

app.post("/getAppointments",authenticateToken,async(req,res,next)=>{
  const userID = req.user.id

  res.json(await mAppointments.getUserAppointments(userID))

})

app.post("/deleteAppointment",authenticateToken,async(req,res,next)=>{
  const userID = req.user.id
  const courseID = req.body.courseID
  const appointmentID = req.body.appointmentID

  res.json(await mAppointments.deleteAppointment(userID,courseID,appointmentID))

})


app.post("/getCourseAppointments",authenticateToken,async(req,res,next)=>{
  const userID = req.user.id
  const courseID = req.body.courseID
  console.log("Checking Permissions...")
  let courseAdmin = await mCourses.getCourseAdmin(courseID)
  if(courseAdmin != userID) return res.send("NOT_AUTHORIZED")

  res.json(await mAppointments.getCourseAppointments(courseID))

})

app.post("/getAdminsCourses",authenticateToken,async(req,res,next)=>{
  const userID = req.user.id
  const role = req.user.role

  if(role != 1) return res.send("ERR_NOT_COURSE_ADMIN")
 

  res.json(await mCourses.getAdminsCourses(userID))
 
  


})

app.post("/Login", async (req,res) => {
  const {email,password} = req.body
  
  var result = await mUsers.getUserByEmail(email)

  if(result.length < 1) return res.json({auth: false, msg: "UserNamePasswordError"})
  const validPassword = await bcrypt.compare(password, result[0].Password);

  if(!validPassword) return res.json({auth: false, msg: "UserNamePasswordError"})
  const accessToken = generateToken(email,result[0].idUser,result[0].Role)

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