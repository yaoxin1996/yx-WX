//创建MySQL连接池
const mysql=require('mysql');
var pool=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'yanxuan',
    connectionLimit:10
});
//导出连接池
module.exports=pool;
