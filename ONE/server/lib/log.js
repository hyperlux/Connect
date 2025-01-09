import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logDir = path.join(__dirname, '../../logs');
const logFile = path.join(logDir, 'audit.log');

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logLevels = {
  INFO: 'INFO',
  WARN: 'WARN', 
  ERROR: 'ERROR'
};

const log = (level, message, context = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...context
  };

  // Write to console
  console.log(JSON.stringify(logEntry));

  // Write to file
  fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
};

export const logger = {
  info: (message, context) => log(logLevels.INFO, message, context),
  warn: (message, context) => log(logLevels.WARN, message, context),
  error: (message, context) => log(logLevels.ERROR, message, context)
};
