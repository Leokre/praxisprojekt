const db = require("../config/Database")
const mUserCourses = require("./userCourses")

exports.getUserAppointments = async function(userID){
    let query = "SELECT * from Appointments WHERE idUser=" + userID
    var results = await mUserCourses.getUserCourses(userID)
    for(i in results){
      query += " OR idCourse=" + results[i].idCourse
    }
    query += " ORDER BY EndDate;"
    //results = await db.promise().query("SELECT * from Appointments WHERE idUser=" + userID + " ORDER BY EndDate;").catch((err)=>{return err})
    results = await db.promise().query(query).catch((err)=>{return err})
    return results[0]
}

exports.getCourseAppointments = async function(courseID){

  var relCourses = await mUserCourses.getRelatedCourses(courseID)
  console.log("Related Courses:")
  console.log(relCourses)
  let query = "SELECT DISTINCT * from Appointments WHERE (idCourse=" + courseID
  for(i in relCourses){
    query += " OR idCourse=" + relCourses[i].idCourse
  }
  query += ") ORDER BY EndDate;"
  //var results = await db.promise().query("SELECT * from Appointments WHERE idUser=" + userID + " ORDER BY EndDate;").catch((err)=>{return err})
  var results = await db.promise().query(query).catch((err)=>{return err})

  //Ändere Workload je nach Anteil der Kursteilnehmer welche dem Workload unterliegen
  for(i in results[0]){
    const workloadCoefficient = (relCourses.filter(course => course.idCourse == results[0][i].idCourse))[0].workloadCoefficient;
    results[0][i] = Object.assign({}, results[0][i], {Workload: results[0][i].Workload * workloadCoefficient,WorkloadCoefficient:workloadCoefficient});
  }

  console.log("Course Appointments:")
  console.log(results[0])
  return results[0]
}

exports.insertUserAppointment = async function(userID,name,startDate,endDate,workload=0,description=""){
  console.log("Workload: ")
  console.log(workload)
    let category = "PRIVAT"
    let tmp = new Date(startDate)
    startDate = tmp.getDate() + "." + (parseInt(tmp.getMonth()) +1) + "." + tmp.getFullYear()
    tmp = new Date(endDate)
    endDate = tmp.getDate() + "." + (parseInt(tmp.getMonth()) +1) + "." + tmp.getFullYear()

    var results = await db.promise().query("INSERT INTO Appointments(idUser,Name,Description,Category,StartDate,EndDate,Workload) VALUES(" + userID + ",'" + name + "','" + description + "','" + category + "',STR_TO_DATE('" + startDate + "', '%d.%m.%Y'),STR_TO_DATE('" + endDate + "', '%d.%m.%Y')," + workload + ");").catch((err)=>{return err})
    console.log("insertUserAppointment results:")
    console.log(results)

    if(!results[0]) return "CREATION_FAILED"

    if(results[0].insertId){
      let tmp = await db.promise().query("SELECT * from Appointments WHERE idAppointment=" + results[0].insertId + ";").catch((err)=>{return err})
      return await tmp[0][0]
    }

    
    
  }

  exports.deleteAppointment = async function(userID,courseID,appointmentID){
    let query;
    if(!courseID) query = "DELETE from Appointments WHERE idUser=" + userID + " AND idAppointment=" + appointmentID + ";"
    else query = "DELETE from Appointments WHERE idAppointment=" + appointmentID + " AND adminName=(Select Email from Users where idUser=" + userID + ");"
    //results = await db.promise().query("SELECT * from Appointments WHERE idUser=" + userID + " ORDER BY EndDate;").catch((err)=>{return err})
    results = await db.promise().query(query).catch((err)=>{return err})
    console.log("DELETION:")
    console.log(results[0].affectedRows)
    if(results[0].affectedRows == 0) return "DELETION_FAILED"
    else return "DELETION_SUCCESS"
}
