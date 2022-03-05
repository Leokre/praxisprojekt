const db = require("../config/Database")

exports.getUserAppointments = async function(){
    var results = await db.promise().query("SELECT * from Appointments ORDER BY EndDate;").catch((err)=>{return err})
    return results[0]
  }

exports.insertUserAppointment = async function(name,startDate,endDate,workload=0,description=""){
  console.log("Workload: ")
  console.log(workload)
    let tmp = new Date(startDate)
    startDate = tmp.getDate() + "." + (parseInt(tmp.getMonth()) +1) + "." + tmp.getFullYear()
    tmp = new Date(endDate)
    endDate = tmp.getDate() + "." + (parseInt(tmp.getMonth()) +1) + "." + tmp.getFullYear()

    var results = await db.promise().query("INSERT INTO Appointments(Name,Description,StartDate,EndDate,Workload) VALUES('" + name + "','" + description + "',STR_TO_DATE('" + startDate + "', '%d.%m.%Y'),STR_TO_DATE('" + endDate + "', '%d.%m.%Y')," + workload + ");").catch((err)=>{return err})
    console.log("insertUserAppointment results:")
    console.log(results)
    if(results){return "APPOINTMENT_CREATED"} else return "CREATION_FAILED"
  }

