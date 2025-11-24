const fs = require('fs');
const path = require('path');

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logFile = path.join(logDir, 'app.log');

/**
 * Log message with timestamp
 */
exports.log = (level, message) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

  // Console output
  console.log(logEntry.trim());

  // Append to file
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.error('Failed to write log:', err.message);
  });
};

/**
 * Shortcut helpers
 */
exports.info = (msg) => exports.log('info', msg);
exports.warn = (msg) => exports.log('warn', msg);
exports.error = (msg) => exports.log('error', msg);
