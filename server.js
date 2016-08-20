var express = require("express");

var app = express();

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

app.get("/todo", function(req, res){
    res.json(todos);
})

app.get("/todo/:id", function(req, res){
    var todoId = req.params.id;
    var result;
    var flag = false;
    for(var i=0 ; i< todos.length; i++)
        {
            if(todos[i].id == todoId)
                {
                   result = todos[i];
                    flag = true;
                }
            
        }
    
      if(flag)
          {
              res.json(result);
          }
      else{
          res.send("No record found");
      }
    
})

app.listen(PORT, function(){
    console.log("Server has started at port:"+PORT);
})