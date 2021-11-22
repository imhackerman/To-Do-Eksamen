const pg = require("pg");
const dbURI = "postgres://dvfrihnwtenmec:dd57911311ad4e4afcced101b316ba1386f75f68d5755b7012cc784e22036d74@ec2-18-202-1-222.eu-west-1.compute.amazonaws.com:5432/d4n071tse3ervn";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
    connectionString: connstring,
    ssl: {rejectUnauthorized: false}
});

let dbMethods = {};

dbMethods.getAllTasklists = function(){
    let sql = "SELECT id, title FROM tasklists"
    return pool.query(sql);
}

dbMethods.getTasksFromList = function(){
    let sql = "SELECT * FROM tasks";
    return pool.query(sql);

}

dbMethods.getAllTasks = function(){
    let sql = "SELECT * FROM tasks";
    return pool.query(sql);
}

dbMethods.deleteTask = function(id){
    let sql = "DELETE FROM tasks WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values);
}

dbMethods.deleteList = function(id){
    let sql = "DELETE FROM tasklists WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values);
}

dbMethods.createTask = function(userid, tasktext, header, listid){
    let sql = "INSERT INTO tasks (id, date, userid, task, header, listid) VALUES(DEFAULT, DEFAULT, $1, $2, $3, $4) RETURNING *";
    let values = [userid, tasktext, header, listid];
    return pool.query(sql, values);
}

dbMethods.createTasklist = function(title, userid){
    let sql = "INSERT INTO tasklists (id, title, userid) VALUES (DEFAULT, $1, $2) RETURNING *";
    let values = [title, userid];
    return pool.query(sql, values);
}


module.exports = dbMethods;