const { loggerChannel } = require('../../config/config.json');
var logChannel = null;

exports.initializeLogger = async (client) => {
  if (loggerChannel) {
    logChannel = await client.channels.cache.get(loggerChannel);
  }
  this.logInfo('bot online');
}

exports.logInfo = (str, context) => {
  const log = `[INFO] ${str}${ context ? ` [${context}]` : ''}`;
  if (logChannel === null) {
    console.log(log);
    return;
  }

  logChannel.send(log);
  return;
};

exports.logError = (str, context) => {
  const log = `[ERROR] ${str}${ context ? ` [${context}]` : ''}`;
  if (logChannel === null) {
    console.log(log);
    return;
  }

  logChannel.send(log);
  return;
};