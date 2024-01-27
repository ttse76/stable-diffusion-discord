const { loggerChannel } = require('../../config/config.json');
var logChannel = null;

exports.initializeLogger = async (client) => {
  if (loggerChannel) {
    logChannel = await client.channels.cache.get(loggerChannel);
  }
  this.logInfo('bot online');
}

exports.logInfo = (str) => {
  const log = `[INFO] ${str}`;
  if (logChannel === null) {
    console.log(log);
    return;
  }

  logChannel.send(log);
  return;
};

exports.logError = (str) => {
  const log = `[ERROR] ${str}`;
  if (logChannel === null) {
    console.log(log);
    return;
  }

  logChannel.send(log);
  return;
};