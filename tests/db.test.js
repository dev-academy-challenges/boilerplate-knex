/* eslint-disable jest/no-conditional-expect */
const testEnv = require('./test-environment')
const db = require('../db')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

test('getUsers gets all users', () => {
  // One for each letter of the alphabet!
  const expected = 3
  return db
    .getUsers(testDb)
    .then((users) => {
      const actual = users.length
      expect(actual).toBe(expected)
    })
    .catch((err) => expect(err).toBeNull())
})

test('getUser gets a single user', () => {
  const expected = 'test user 1'
  return db
    .getUser(99901, testDb)
    .then((user) => {
      const actual = user.name
      expect(actual).toBe(expected)
    })
    .catch((err) => expect(err).toBeNull())
})
