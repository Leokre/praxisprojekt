const db = require("../config/Database")

exports.getUserSessions = async function(userID){

    var results = await db.promise().query("SELECT DISTINCT SessionID,SessionName,SessionThema,Berechtigung FROM Sessions NATURAL JOIN GroupUserSession WHERE idSession=SessionID AND UserID= " + userID + "").catch((err)=>{return err})
    return results[0]
  
    
  }

exports.insertUser = async function(username,password){

    var results = await db.promise().query("INSERT INTO USERS(Username,Password,SchnellAntwort) VALUES('" + username + "','" + password +"','" + defaultQuickReplies + "')").catch((err)=>{return err})
    return "USER_CREATED"
  
  }

exports.getUserByName = async function(username){

  var results = await db.promise().query("SELECT * FROM USERS WHERE USERNAME='" + username + "';").catch((err)=>{return err})
  return results[0]
  
}