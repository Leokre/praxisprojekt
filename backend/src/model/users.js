const db = require("../config/Database")


exports.getUserByEmail = async function(email){

  var results = await db.promise().query("SELECT * FROM USERS WHERE EMAIL='" + email + "';").catch((err)=>{return err})
  return results[0]
  
}