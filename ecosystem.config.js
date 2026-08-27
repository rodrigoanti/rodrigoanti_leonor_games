module.exports = {
  apps: [
    {
      name: "leonor-games",
      script: "npm",
      args: "start",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "200M",
      env: {
        NODE_ENV: "production",
        PORT: 3004,
      },
    },
  ],
};
