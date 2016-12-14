var express = require('express')

var db = require('../db')

module.exports = {
  get: get
}

function get (req, res) {
  db.getUsers()
    .then(function (users) {
      res.render('index', { users: users })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
}
