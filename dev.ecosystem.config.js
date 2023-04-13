module.exports = {
  apps: [
    {
      name: 'auth-apis',
      script: './dist/apps/auth-apis/src/main.js',
      env_development: {
        NODE_ENV: 'development',
        APP_PORT: 8032,
      },
      watch: true,
    },
    {
      name: 'control-panel',
      script: './dist/apps/control-panel/src/main.js',
      env_development: {
        NODE_ENV: 'development',
        APP_PORT: 8033,
      },
      watch: true,
    },
    {
      name: 'jobs-apis',
      script: './dist/apps/job-apis/src/main.js',
      env_development: {
        NODE_ENV: 'development',
        APP_PORT: 8034,
      },
      watch: true,
    },
    {
      name: 'users-apis',
      script: './dist/apps/users-apis/src/main.js',
      env_development: {
        NODE_ENV: 'development',
        APP_PORT: 8035,
      },
      watch: true,
    },
    {
      name: 'applications-apis',
      script: './dist/apps/application-apis/src/main.js',
      env_development: {
        NODE_ENV: 'development',
        APP_PORT: 8036,
      },
      watch: true,
    },
  ],
};
