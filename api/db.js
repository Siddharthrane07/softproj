import mysql from "mysql"

export const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Sidz07@rane",
    database:"codesoft",
    // multipleStatements: true,
    
})

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log("connected");
}
);