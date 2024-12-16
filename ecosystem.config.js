module.exports = {
  apps: [{
    name: 'auroville-connect',
    cwd: './server',
    script: 'index.js',
    env: {
      NODE_ENV: process.env.NODE_ENV || 'development',
      PORT: process.env.PORT || 5000,
      HOST: '0.0.0.0'
    },
    error_file: 'logs/error.log',
    out_file: 'logs/out.log',
    watch: process.env.NODE_ENV !== 'production',
    ignore_watch: ['node_modules', 'logs']
  }]
};
