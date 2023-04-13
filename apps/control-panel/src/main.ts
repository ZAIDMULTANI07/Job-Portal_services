import { RestServer } from '@libs/boat';
import { ControlPanelModule } from './module';

RestServer.make(ControlPanelModule, {
  globalPrefix: 'api/v1',
  addValidationContainer: true,
  port: +process.env.APP_PORT,
});
