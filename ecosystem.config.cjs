module.exports = {
  apps: [
    {
      name: "byknic-api",
      cwd: "/var/www/byknic-api",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
