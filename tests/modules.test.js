const guid = require('../src/modules/guid');
const logger = require('../src/modules/logger');

describe('logger tests', () => {
  test('log info with context', () => {
    const logSpy = jest.spyOn(global.console, 'log');
  
    const context = guid.newGuid();
    const log = 'test log';

    logger.logInfo(log, context);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(`[INFO] ${log} [${context}]`);

    logSpy.mockClear();
  });

  test('log info without context', () => {
    const logSpy = jest.spyOn(global.console, 'log');
  
    const log = 'test log';

    logger.logInfo(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(`[INFO] ${log}`);

    logSpy.mockClear();
  });
});