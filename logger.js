import bunyan from "bunyan"
import { LoggingBunyan } from "@google-cloud/logging-bunyan"
const loggingBunyan = new LoggingBunyan();

// Create a Bunyan logger that streams to Cloud Logging
// Logs will be written to: "projects/PROJECT_ID/logs/bunyan_log"
const logger = bunyan.createLogger({
  name: 'siloka-backend',
  streams: [
    { stream: process.stdout, level: 'info' },
    loggingBunyan.stream('info'),
  ],
});

export default logger;