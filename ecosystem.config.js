module.exports = {
  apps : [{
    name: 'Local Food Nodes API',
    script: 'index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: '127.0.0.1',
      ref: 'origin/master',
      repo: 'git@gitlab.com:localfoodnodes/localfoodnodes-api.git',
      path: '/var/www/localfoodnodes-api',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
