const express = require("express");
const cors = require("cors");
const mongoClient = require("mongodb").MongoClient;

const app = express();

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/get-categories", (req, res)=>{

      mongoClient.connect("mongodb://127.0.0.1:27017")
      .then(clientObj=>{
            var database = clientObj.db("video-project");
            database.collection("tblcategories").find({}).toArray().then(documents=>{
                  res.send(documents);
                  res.end();
            });
      });
});

app.post("/add-category",(req,res)=>{
      var item={
            category_id:parseInt(req.body.category_id),
            category_name:req.body.category_name
      }

      mongoClient.connect("mongodb://127.0.0.1:27017").then(clientObj=>{
            var database=clientObj.db("video-project");
            database.collection("tblcategories").insertOne(item).then(()=>{
                  console.log(`categories added...`);
                  res.end();
            });
      });

});
app.get("/get-admin",(req,res)=>{
      mongoClient.connect("mongodb://127.0.0.1:27017")
      .then(clientObj=>{
            var database=clientObj.db("video-project");
            database.collection("tbladmin").find({}).toArray().then(documents=>{
                  res.send(documents);
                  res.end;
            });
      });
});
app.post("/add-admin",(req,res)=>{
      var admin={
            admin_id:req.body.admin_id
      }
      mongoClient.connect("mongodb://127.0.0.1:27017").then(clientObj=>{
            var database=clientObj.db("video-project");
            database.collection("tbladmin").insertOne(admin).then(()=>{
                  console.log(`admin added..`);
                  res.end();
            })
      })
})

app.post("/add-video", (req, res)=>{

     var video = {
        video_id : parseInt(req.body.video_id),
        title: req.body.title,
        description:req.body.description,
        comments: req.body.comments,
        like : parseInt(req.body.like),
        views : parseInt(req.body.views),
        url: req.body.url,
        category_id: parseInt(req.body.category_id)
     }

      mongoClient.connect("mongodb://127.0.0.1:27017").then(clientObj=>{

            var database = clientObj.db("video-project");

            database.collection("tblvideos").insertOne(video).then(()=>{
                   console.log('Video Added..');
                   res.end();
            })

      })

})

app.put("/edit-video/:id", (req, res)=>{

     var id  = parseInt(req.params.id);

     var video = {
        video_id : parseInt(req.body.video_id),
        title: req.body.title,
        description:req.body.description,
        comments: req.body.comments,
        like : parseInt(req.body.like),
        views : parseInt(req.body.views),
        url: req.body.url,
        category_id: parseInt(req.body.category_id)
     }

      mongoClient.connect("mongodb://127.0.0.1:27017").then(clientObj=>{

            var database = clientObj.db("video-project");

            database.collection("tblvideos").updateOne({video_id:id},{$set:video}).then(()=>{
                   console.log('Video Updated..');
                   res.end();
            })

      })
})
app.listen(5050);
console.log(`API Started http://127.0.0.1:5050`);