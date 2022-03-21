/* eslint-disable jest/no-conditional-expect */
const request = require('supertest')
const { screen } = require('@testing-library/dom')
require('@testing-library/jest-dom')
/* eslint-disable jest/no-conditional-expect */

jest.mock('../db', () => ({
  getUser: (id) =>
    Promise.resolve({ id: id, name: 'test user', email: 'test@user.nz' }),
  getUsers: () =>
    Promise.resolve([
      { id: 2, name: 'test user 2', email: 'test2@user.nz' },
      { id: 4, name: 'test user 4', email: 'test4@user.nz' },
    ]),
}))

const server = require('../server')

test('GET /', () => {
  return request(server)
    .get('/')
    .expect(200)
    .then((res) => {
      document.body.innerHTML = res.text
      const firstLiText = screen.getByText('test user 2 (test2@user.nz)')
      expect(firstLiText).toBeInTheDocument()
    })
    .catch((err) => expect(err).toBeNull())
})
