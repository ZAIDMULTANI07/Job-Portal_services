import { ApplicationApisModule } from './module';

import { RestServer } from '@libs/boat';

RestServer.make(ApplicationApisModule, {
  globalPrefix: 'api/v1',
  addValidationContainer: true,
  port: +process.env.APP_PORT,
});
