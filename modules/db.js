const pg = require("pg");
const dbURI = "postgres://dvfrihnwtenmec:dd57911311ad4e4afcced101b316ba1386f75f68d5755b7012cc784e22036d74@ec2-18-202-1-222.eu-west-1.compute.amazonaws.com:5432/d4n071tse3ervn";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
    connectionString: connstring,
    ssl: {rejectUnauthorized: false}
});

let dbMethods = {};

dbMethods.getAllTasks = function(){
    let sql = "SELECT * FROM tasks";
    return pool.query(sql);
}