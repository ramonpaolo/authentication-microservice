import test from 'ava';
import sinon from 'sinon'

// utils
import { loggerInfo, loggerError } from '../../../utils/logger.utils';

// settings
import logger from '../../../settings/logger.settings';

let sdx: sinon.SinonSandbox;

test.beforeEach(() => {
  sdx = sinon.createSandbox()
})

test.afterEach('clear sinon', () => {
  sdx.restore()
})

test('should log info in console with the full body', (t) => {
  const loggerSpy = sdx.spy(logger, 'info')

  const body = {
    message: 'test message',
    status: 'success',
    data: undefined,
  }

  loggerInfo(body.message)

  t.is(loggerSpy.calledOnce, true)
  t.is(loggerSpy.calledWithMatch(body), true)
})

test('should log error in console with the full body', (t) => {
  const loggerSpy = sdx.spy(logger, 'error')

  const fakeError = new Error('Fake Error')

  const body = {
    message: 'test message',
    status: 'failed',
    data: undefined,
    error: {
      error_name: 'Error',
      error_message: 'Fake Error',
    },
  }

  loggerError(fakeError, body.message)

  t.is(loggerSpy.calledOnce, true)
  t.is(loggerSpy.calledWithMatch(body), true)
})
