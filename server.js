var express = require("express");

var bodyParser = require("body-parser");

var db = require("./db.js"); 

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
    completed:true
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
    
    var data = _.pick(body, "id", "description", "completed");
    
    
    if(!_.isBoolean(data.completed) || !_.isString(data.description) || data.description.trim().length === 0)
        {
            res.status(400).send();
            return;
        }
    
    //todos.push(data);
    db.todo.create(data).then(function(data1)
    {
      //res.status(200).json(data1);
      res.json(data1);
    }).catch(function(e){
        res.status(400).json(e);
    });
       
})

app.put("/todo/:id", function(req, res){
    
    var body = req.body;
    
    var data = _.pick(body, "id", "description", "completed");
    
    var record = _.findWhere(todos, {id: parseInt(req.params.id)});
    
    if(!record)
        {
            res.status(404).send();
        }
    
    var todoMatched = {};
    
    if(data.hasOwnProperty('description') && _.isString(data.description) && data.description.trim().length !== 0)
        {
            todoMatched.description = data.description;
        }
    else if(data.hasOwnProperty('description'))
        {
            res.status(400).send();
            return;
        }
    
    if(data.hasOwnProperty('id') && _.isNumber(data.id))
        {
            todoMatched.id = data.id;
        }
    else if(data.hasOwnProperty('id'))
        {
            res.status(400).send();
            return;
        }
    
    if(data.hasOwnProperty('completed') && _.isBoolean(data.completed))
        {
            todoMatched.completed = data.completed;
        }
    else if(data.hasOwnProperty('completed'))
        {
            res.status(400).send();
            return;
        }
    
    _.extend(record,todoMatched)
    
    res.json(todos);
})

app.get("/todo", function(req, res){
    
    var filterTodo = todos;
    
    var queryParam = req.query;
   
    if(queryParam.hasOwnProperty("completed") && queryParam.completed === "true")
        {
            filterTodo = _.where(filterTodo, {"completed":true});
        }
    else if(queryParam.hasOwnProperty("completed") && queryParam.completed === "false")
        {
             
            filterTodo = _.where(filterTodo, {"completed":false});
        
        }

    if(queryParam.hasOwnProperty("q") && queryParam.q.length >0)
        {
            filterTodo = _.filter(filterTodo, function(todo){
                return todo.description.toLowerCase().indexOf(queryParam.q.toLowerCase()) >=0;
            })
        }
    res.json(filterTodo);
})

app.get("/todo/:id", function(req, res){
    var todoId = req.params.id;
    var result = _.findWhere(todos,{id:parseInt(todoId)});
    
      if(result)
          {
              res.json(result);
          }
      else{
          res.status(404).send();
      }
    
})

app.delete("/todo/:id", function(req, res){
    var todoId = req.params.id;
    var elm = _.findWhere(todos,{id:parseInt(todoId)});
    
      if(elm)
          {
              todos = _.without(todos,elm);
              res.json(todos);
          }
      else{
          res.status(404).send();
      }
    
})

db.sequelize.sync().then(function(){
        app.listen(PORT, function(){
        console.log("Server has started at port:"+PORT);
    });
});

