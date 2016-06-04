var express = require('express');
var fs = require('fs');
var _ = require('lodash');
var users = [];

var app = express();

fs.readFile('users.json', {encoding: 'utf-8'}, function (err, data) {
  if (err) throw err;

  JSON.parse(data).forEach(function(user) {
    user.name.full = _.startCase(user.name.first) + ''+ _.startCase(user.name.last);
    users.push(user);
  }) 
})

app.get('/', function(req, res) {
  res.send(users);
});

app.get('/userlist', function(req, res) {
  var buffer = '';
  users.forEach(function (user) {
    buffer += '<a href="/' + user.username + '">' + user.name.full + '</a><br>';
  });
  res.send(buffer);
})

app.get('/:username', function(req, res) {
  var username = req.params.username;
  res.send(username);
})

app.get('/:name', function(req, res, next) {
  var name = req.params.name;
  res.send(name);
})


var server =  app.listen(3000, function() {
  console.log('listening on 3000');
});

