
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var persons = [
  {
    id:1,
    name: 'John'
  },
  {
    id:2,
    name: 'Maria'
  },
  {
  id:3,
  name: 'Daniel'
  }
];
var currentId = 3;


var PORT = process.env.PORT || 3000;
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.get('/team', function(req, res) {
  res.send({persons: persons});
});

app.post('/team', function(req, res) {
    var personName = req.body.name;
    currentId++;
    // console.log(personName);

    persons.push({
        id: currentId,
        name: personName
    });

    res.send('Successfully created person!');
});

app.put('/team/:id', function(req, res) {
    var id = req.params.id;
    var newName = req.body.newName;

    var found = false;

    persons.forEach(function(person, index) {
        if (!found && person.id === Number(id)) {
            person.name = newName;
        }
    });

    res.send('Succesfully updated person name!');
});

app.delete('/team/:id', function(req,res){
  var id = req.params.id;
  var found = false;

  persons.forEach(function(person, index){
    if(!found && person.id === Number(id)){
      persons.splice(index,1);
    }
  });
  res.send('Successflly deleted person');
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
