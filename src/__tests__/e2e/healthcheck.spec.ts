import test from 'ava'
import supertest from 'supertest'
import sinon from 'sinon'

import server from '../../index'

const app = supertest(server)

let sdx: sinon.SinonSandbox;

test.beforeEach(() => {
  sdx = sinon.createSandbox()
})

test.afterEach('clear sinon', () => {
  sdx.restore()
})

test('should receive status ok when do request to healthcheck', async (t) => {
  sdx.stub(process, 'uptime').returns(100000)

  const response = await app.get('/api/v1/healthcheck')

  t.like(response.body, {
    status: 'success',
    message: 'project is working',
    uptime: 100000,
  })

  t.is(response.statusCode, 200)
})