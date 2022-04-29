const db = require("../config/Database")

exports.getAdminsCourses = async function(userID){

    var results = await db.promise().query("SELECT * FROM Courses WHERE idAdmin= " + userID + "").catch((err)=>{return err})
    return results[0]
  
    
  }

exports.getCourseAdmin = async function(courseID){

  var results = await db.promise().query("SELECT idAdmin FROM Courses WHERE idCourse= " + courseID + "").catch((err)=>{return err})
  var resultArray = Object.values(JSON.parse(JSON.stringify(results[0])))
  return resultArray[0].idAdmin

  
}