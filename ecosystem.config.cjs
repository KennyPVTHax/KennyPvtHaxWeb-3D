module.exports = {
  apps: [
    {
      name: "kennypvthax",
      cwd: "./backend",
      script: "uvicorn",
      args: "server:app --host 127.0.0.1 --port 8000",
      interpreter: "none",
      env: {
        PYTHONUNBUFFERED: "1",
      },
    },
  ],
};
