var express = require('express');
var fs = require('fs');
var _ = require('lodash');
var engines = require('consolidate');
var users = [];

var app = express();

fs.readFile('users.json', {encoding: 'utf-8'}, function (err, data) {
  if (err) throw err;

  JSON.parse(data).forEach(function(user) {
    user.name.full = _.startCase(user.name.first) + ' '+ _.startCase(user.name.last);
    users.push(user);
  }) 
})

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

app.use('/profilepics', express.static('images'));

app.get('/', function(req, res) {
  res.render('index', {users: users});
});

app.get('/userobj', function(req, res) {
  res.send(users);
})

app.get('/:username', function(req, res) {
  var username = req.params.username;
  res.render('user', {username: username});
})


var server =  app.listen(3000, function() {
  console.log('listening on 3000');
});

