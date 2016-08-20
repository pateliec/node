var express = require("express");

var bodyParser = require("body-parser");

var _ = require("underscore");

var app = express();

app.use(bodyParser.json())

var PORT = process.env.PORT || 3000;

var todos = [{
    id:1,
    description: "Finish Node Api videos",
    completed:false
},
             {
    id:2,
    description: "Go to Market",
    completed:false
},
             {
    id:3,
    description: "Go to Temple",
    completed:false
},
             {
    id:4,
    description: "Have lunch",
    completed:true
}
]

app.get("/", function(req, res){
    res.send("Todo Api Root");
})

app.post("/todo", function(req, res){
    
    var body = req.body;
    
    var data = _.pick(body, {"id", "description", "completed"})
    
    if(_.isNumber(data.id) || _.isBoolean(data.completed) || _.isString(data.description) || data.description.trim().length() === 0)
        {
            res.status(400).send();
            return;
        }
    
    todos.push(data);
    res.json(todos);
})

app.get("/todo", function(req, res){
    res.json(todos);
})

app.get("/todo/:id", function(req, res){
    var todoId = req.params.id;
   
    var result = _.findwhere(todos,todoId)
    
      if(result)
          {
              res.json(result);
          }
      else{
          res.status(404).send();
      }
    
})

app.listen(PORT, function(){
    console.log("Server has started at port:"+PORT);
})