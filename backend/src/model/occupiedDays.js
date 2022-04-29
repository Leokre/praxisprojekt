const db = require("../config/Database")
const mUserCourses = require("./userCourses")
const mAppointments = require("./appointments")
exports.insertOccupiedDays = async function(days){
    console.log("insertOccupiedDay called")
    console.log("days")
    console.log(days)
    var query = `INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES ?`
    let values = [[]]
    for(let i=0;i<days.length;i++){
        let date = new Date(days[i].date)
        date.setHours(date.getHours() + 2)
        values[0].push([days[i].userID,days[i].appointmentID,(days[i].courseID || null),new Date(date).toISOString().slice(0, 19).replace('T', ' '),(days[i].workload || 0)])
    }

    if(query.length<=1) return "ERR_NO_DATA"
    var results = await db.promise().query(query,values).catch((err)=>{return err})
    return results

  }

  exports.getUserOccDays = async function(userID,startDate,endDate){
    console.log("getUserOccDays called")
    let query = "SELECT * from OccupiedDays WHERE idUser=" + userID 
    var results = await mUserCourses.getUserCourses(userID)
    for(i in results){
        query += " OR idCourse=" + results[i].idCourse
    }
    query += " AND Date BETWEEN '" + new Date(startDate).toISOString().slice(0, 19).replace('T', ' ') + "' AND '" + new Date(endDate).toISOString().slice(0, 19).replace('T', ' ') + "' ORDER BY Date;"
    console.log("getUserOccDaysQuery")
    console.log(query)
    results = await db.promise().query(query).catch((err)=>{return err})
    return results[0]
}

exports.getCourseOccDays = async function(courseID,startDate,endDate){
    console.log("getCourseOccDays called")
    var courseAppointments = await mAppointments.getCourseAppointments(courseID)
    console.log("getCourseAppointments results:")
    console.log(courseAppointments)

    
   

    if(!courseAppointments || courseAppointments.length == 0) return []
    var coefficientMap = new Map()
    coefficientMap.set(courseAppointments[0].idCourse,courseAppointments[0].WorkloadCoefficient)
    let query = "SELECT * from OccupiedDays WHERE idAppointment=" + courseAppointments[0].idAppointment

    for(let i=1;i<courseAppointments.length;i++){
        query+= " OR idAppointment=" + courseAppointments[i].idAppointment
        coefficientMap.set(courseAppointments[i].idCourse,courseAppointments[i].WorkloadCoefficient)
    }

    query += " AND Date BETWEEN '" + new Date(startDate).toISOString().slice(0, 19).replace('T', ' ') + "' AND '" + new Date(endDate).toISOString().slice(0, 19).replace('T', ' ') + "' ORDER BY Date;"
    var results = await db.promise().query(query).catch((err)=>{return err})
    
    console.log("getCourseOccDays result:")
    console.log(results[0])

    for(let i=0;i<results[0].length;i++){
        results[0][i].Workload = (coefficientMap.get(results[0][i].idCourse) * results[0][i].Workload)
    }
    console.log("TRANSFORMED:")
    console.log(results[0])

    return results[0]
}