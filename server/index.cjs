const cors=require("cors");
const mongoClient=require("mongodb").MongoClient;
const express=require("express");

const app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json);

app.get("/get-categories",(req,res)=>{
    mongoClient.connect("mongodb://127.0.0.1:27017")
    .then(clientObj=>{
        var database=clientObj.db("video-project");
        database.collection("tblcategories").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end;
        })
})
})
app.listen(5050);
console.log(`server started... http://127.0.0.1:5050`);