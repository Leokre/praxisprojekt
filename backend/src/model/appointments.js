const db = require("../config/Database")

exports.getUserAppointments = async function(userID){
    console.log
    var results = await db.promise().query("SELECT * from Appointments WHERE idUser=" + userID + " ORDER BY EndDate;").catch((err)=>{return err})
    return results[0]
  }

exports.insertUserAppointment = async function(userID,name,startDate,endDate,workload=0,description=""){
  console.log("Workload: ")
  console.log(workload)
    let tmp = new Date(startDate)
    startDate = tmp.getDate() + "." + (parseInt(tmp.getMonth()) +1) + "." + tmp.getFullYear()
    tmp = new Date(endDate)
    endDate = tmp.getDate() + "." + (parseInt(tmp.getMonth()) +1) + "." + tmp.getFullYear()

    var results = await db.promise().query("INSERT INTO Appointments(idUser,Name,Description,StartDate,EndDate,Workload) VALUES(" + userID + ",'" + name + "','" + description + "',STR_TO_DATE('" + startDate + "', '%d.%m.%Y'),STR_TO_DATE('" + endDate + "', '%d.%m.%Y')," + workload + ");").catch((err)=>{return err})
    console.log("insertUserAppointment results:")
    console.log(results)

    if(!results[0]) return "CREATION_FAILED"

    if(results[0].insertId){
      let tmp = await db.promise().query("SELECT * from Appointments WHERE idAppointment=" + results[0].insertId + ";").catch((err)=>{return err})
      return await tmp[0][0]
    }

    
    
    
    //if(results){return "APPOINTMENT_CREATED"} else return "CREATION_FAILED"
  }

