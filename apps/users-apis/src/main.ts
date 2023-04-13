import { RestServer } from '@libs/boat';
import { UserApisModule } from './module';

RestServer.make(UserApisModule, {
  globalPrefix: '/api/v1/',
  addValidationContainer: true,
  port: +process.env.APP_PORT,
});
