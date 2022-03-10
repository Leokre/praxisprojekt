const db = require("../config/Database")

exports.getUserSessions = async function(userID){

    var results = await db.promise().query("SELECT DISTINCT SessionID,SessionName,SessionThema,Berechtigung FROM Sessions NATURAL JOIN GroupUserSession WHERE idSession=SessionID AND UserID= " + userID + "").catch((err)=>{return err})
    return results[0]
  
    
  }

exports.insertUser = async function(email,password){

    var results = await db.promise().query("INSERT INTO USERS(Email,Password,SchnellAntwort) VALUES('" + email + "','" + password +"','" + defaultQuickReplies + "')").catch((err)=>{return err})
    return "USER_CREATED"
  
  }

exports.getUserByEmail = async function(email){

  var results = await db.promise().query("SELECT * FROM USERS WHERE EMAIL='" + email + "';").catch((err)=>{return err})
  return results[0]
  
}