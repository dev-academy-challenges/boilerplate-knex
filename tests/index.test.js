var test = require('tape')

var config = require('../knexfile').test
var testDb = require('knex')(config)

function setupTestDb () {
  process.env.NODE_ENV = 'test'
  return testDb.migrate.latest()
    .then(function () {
      return testDb.seed.run()
    })
}

function tearDownTestDb () {
  process.env.NODE_ENV = 'development'
  return testDb.destroy()
}

test('Test harness working', function (t) {
  setupTestDb()
    .then(runTest)
    .then(tearDownTestDb)

  function runTest () {
    t.pass()
    t.end()
  }
})
