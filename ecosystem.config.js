module.exports = {
  apps: [{
    name: 'auroville-connect',
    cwd: '/root/AurovilleConnect/server',
    script: 'index.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
      HOST: '0.0.0.0'
    },
    error_file: '/var/log/auroville-connect/error.log',
    out_file: '/var/log/auroville-connect/out.log'
  }]
};
