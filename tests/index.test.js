// Note: we use AVA here because it makes setting up the
// conditions for each test relatively simple. The same
// can be done with Tape using a bit more code.

var test = require('ava')
var knex = require('knex')

var config = require('../knexfile').test
var db = require('../db')

// Create a separate in-memory database before each test.
// In our tests, we can get at the database as `t.context.db`.
test.beforeEach(function (t) {
  t.context.db = knex(config)
  return t.context.db.migrate.latest()
    .then(function () {
      return t.context.db.seed.run()
    })
})

// Destroy the in-memory database after each test.
test.afterEach(function (t) {
  t.context.db.destroy()
})

test('getUsers gets all users', function (t) {
  // One for each letter of the alphabet!
  var expected = 26
  return db.getUsers(t.context.db)
    .then(function (result) {
      var actual = result.length
      t.is(expected, actual)
    })
})

test('getUsers gets a single user', function (t) {
  var expected = 'Ambitious Aardvark'
  return db.getUser(99901, t.context.db)
    .then(function (result) {
      var actual = result[0].name
      t.is(expected, actual)
    })
})
