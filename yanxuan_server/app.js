//加载响应模块
const express=require("express");
const mysql=require("mysql");
const pool=require("./pool");
//创建express服务器
var app=express();
//绑定监听端口
app.listen(3000);
app.use(express.static(__dirname+"/public"));

//功能一:创建小程序首页，轮播
app.get("/imagelist",(req,res)=>{
    var sql="SELECT cid,img FROM wy_index_carousel";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})



//商品列表
app.get("/index",(req,res)=>{
    var pno=req.query.pno;      //页码
    var pageSize=req.query.pageSize;        //页大小
    var sql="SELECT count(pid) as s FROM wy_index_product";
    var process=0;
    var obj={pno:pno,pageSize:pageSize};
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        var pageCount=Math.ceil(result[0].p/pageSize);
        process+=50;
        obj.pageCount=pageCount;
        if(process==100){
            res.send(obj);
        }
    })
    var sql="SELECT * FROM wy_index_product LIMIT ?,?";
    var offset=parseInt((pno-1)*pageSize);
    pageSize=parseInt(pageSize);
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;
        process+=50;
        obj.data=result;
        if(process==100){
            res.send(obj);
        }
    });
});


//消息
app.get("/msg",(req,res)=>{
    var sql=`SELECT * FROM wy_xinpin`;
    pool.query(sql,(err,result)=>{
        if (err) throw err;
        res.send(result);
    })
})

//评论
app.get("/content",(req,res)=>{
    var sql="SELECT wid,content,from_uname,avatar,w_res,xdate,score FROM wy_content";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})


//商品图片
app.get("/pic",(req,res)=>{
    var pid=parseInt(req.query.pid);
    var sql=' SELECT d.pid,d.pname,d.subtitle,d.price,d.category,d.p_sale,d.pic,d.spec,p.sm FROM wy_index_product AS d INNER JOIN yx_product_pic AS p ON d.pid=p.p_id WHERE p.p_id=?'
    pool.query(sql,[pid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})
//楼层一 拼团
app.get("/pin",(req,res)=>{
    var sql="SELECT * FROM wy_product";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

//拼团详情
app.get("/pdetail",(req,res)=>{
    var tid=parseInt(req.query.tid)
    var sql="SELECT d.tid,d.pname,d.subtitle,d.price,d.category,d.p_sale,d.pic,d.spec,p.sm FROM wy_product AS d INNER JOIN yx_index_pic AS p ON d.tid=p.t_id WHERE p.t_id=?";
    pool.query(sql,[tid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})







const qs=require("querystring");
app.post("/addUser",(req,res)=>{
    //下载第三方模块
    //var u=req.body.uname;
    //var p=req.body.upwd;
    req.on("data",(buff)=>{
        //"uname=tom&upwd=123"
        var obj=qs.parse(buff.toString());
        res.send(obj);
    });
});


