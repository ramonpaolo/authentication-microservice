import test from 'ava';
import sinon from 'sinon'

// utils
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

  const message = 'test message'

  logger.info(message)

  t.is(loggerSpy.calledOnce, true)
  t.is(loggerSpy.args[0][0] as unknown as string, message)
})

test('should log error in console with the full body', (t) => {
  const loggerSpy = sdx.spy(logger, 'error')

  const message = 'test message'

  logger.error(message)

  t.is(loggerSpy.calledOnce, true)
  t.is(loggerSpy.args[0][0] as unknown as string, message)
})
