import app from "./app";

import "./config/database";

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

const signals = ["SIGINT", "SIGTERM"];

signals.forEach((signal) => {
  process.on(signal, () => {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);
    server.close(() => {
      console.log("HTTP server closed.");
      process.exit(0);
    });
  });
});
