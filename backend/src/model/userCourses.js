const db = require("../config/Database")

  exports.getCourseUsers = async function(courseID){

    var results = await db.promise().query("SELECT idUser FROM UserCourses WHERE idCourse= " + courseID + "").catch((err)=>{return err})
    console.log("getCourseUsers result:")
    console.log(results)
    var resultArray = Object.values(JSON.parse(JSON.stringify(results[0])))
    return resultArray
  
    
  }

  exports.getUserCourses = async function(userID){
    var results = await db.promise().query("SELECT idCourse FROM UserCourses WHERE idUser= " + userID + "").catch((err)=>{return err})
    var resultArray = Object.values(JSON.parse(JSON.stringify(results[0])))
    return resultArray
  
    
  }

  exports.getRelatedCourses = async function(courseID){
    //Gibt die Kurse aus welche von Teilnehmern des angegeben Kurses ebenfalls belegt wurden
    //
    var courseUsers = await this.getCourseUsers(courseID)
    if(courseUsers.length== 0) return "NO_COURSE_USERS"
    var sqlString = "SELECT idCourse,count(*) AS numStudents FROM UserCourses WHERE"
    for(i in courseUsers){
      i==0? sqlString += " (idUser=" + courseUsers[i].idUser : sqlString += " OR idUser=" + courseUsers[i].idUser
    }
    sqlString += ") GROUP BY idCourse;"
    console.log("sqlString: " + sqlString)
    //var results = await db.promise().query("SELECT idUser FROM UserCourses WHERE idCourse= " + courseID + "").catch((err)=>{return err})
    var results = await db.promise().query(sqlString).catch((err)=>{return err})
    var resultArray = Object.values(JSON.parse(JSON.stringify(results[0])))
    const selectedCourseStudents = (resultArray.filter(course => course.idCourse == courseID))[0].numStudents;
   
    const transformed = resultArray.map(({ idCourse, numStudents }) => ({idCourse: idCourse,numStudents: numStudents,workloadCoefficient:(numStudents/selectedCourseStudents)}));

    
    return transformed
  
    
  }

