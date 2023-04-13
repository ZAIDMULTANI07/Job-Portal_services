module.exports = {
  apps: [
    {
      name: 'zaid-auth-apis',
      script: './dist/apps/auth-apis/src/main.js',
      env_production: {
        NODE_ENV: 'production',
        APP_PORT: 8032,
      },
      watch: false,
    },
    {
      name: 'zaid-control-panel',
      script: './dist/apps/control-panel/src/main.js',
      env_production: {
        NODE_ENV: 'production',
        APP_PORT: 8033,
      },
      watch: false,
    },
    {
      name: 'zaid-jobs-apis',
      script: './dist/apps/job-apis/src/main.js',
      env_production: {
        NODE_ENV: 'production',
        APP_PORT: 8034,
      },
      watch: false,
    },
    {
      name: 'zaid-users-apis',
      script: './dist/apps/users-apis/src/main.js',
      env_production: {
        NODE_ENV: 'production',
        APP_PORT: 8035,
      },
      watch: false,
    },
    {
      name: 'zaid-applications-apis',
      script: './dist/apps/application-apis/src/main.js',
      env_production: {
        NODE_ENV: 'production',
        APP_PORT: 8036,
      },
      watch: false,
    },
  ],
};
