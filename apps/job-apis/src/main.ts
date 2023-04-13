import { RestServer } from '@libs/boat';
import { JobApisModule } from './module';

RestServer.make(JobApisModule, {
  globalPrefix: 'api/v1',
  addValidationContainer: true,
  port: +process.env.APP_PORT,
});
