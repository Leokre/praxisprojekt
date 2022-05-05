const mysql = require("mysql2");
const db_config = {
    host: "localhost",
    user: "root",
    password: "toor",
    database: "praxisprojekt-db"
}
module.exports = mysql.createPool(db_config)