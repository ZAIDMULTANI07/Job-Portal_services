import { AuthApisModule } from './module';

import { RestServer } from '@libs/boat';

RestServer.make(AuthApisModule, {
  globalPrefix: 'api/v1',
  addValidationContainer: true,
  port: +process.env.APP_PORT,
});
