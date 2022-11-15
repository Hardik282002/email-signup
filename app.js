// ECHO is on.
const express=require("express");
const bodyparser=require("body-parser");
const request= require("request");
const https=require("https");
// const { request } = require("http");
const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/server.html");
});
app.post("/",function(req,res){
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const emailaddress= req.body.emailname;
   const data={
    members:[
        {
            email_address:emailaddress,
            status:"subscribed",
            merge_fields:{
                FNAME: firstname,
                LNAME: lastname 
            }
        }
    ]
   };
   const jsondata=JSON.stringify(data);
   const url="https://us14.api.mailchimp.com/3.0/lists/b497685200";
   const options={
    method:"POST",
    auth :"hardik:2c7741dec1db99ee58507fdbae728584-us14"
   }
   const request= https.request(url,options,function(response){
           
           if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
           }
           else
           res.sendFile(__dirname + "/failure.html")
         
           response.on("data",function(data){
            
            console.log(JSON.parse(data));
           })
    })
    request.write(jsondata);
    request.end();
});


app.post("/failure",function(req,res){
   res.redirect("/");
});


// app.get("/failure",function(req,res){
//     res.sendFile(__dirname + "/failure.html");
// });

app.listen(process.env.PORT||3000,function(req,res){
    // res.send("running on port 3000");
    console.log("running on port 3000");
});

// 2c7741dec1db99ee58507fdbae728584-us14
// b497685200
