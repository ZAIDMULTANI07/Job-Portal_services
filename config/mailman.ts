import { MailmanOptions } from '@libs/boat/mailman/src';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'mailman',
  () =>
    ({
      host: process.env.MAILMAN_HOST,
      port: +process.env.MAILMAN_PORT,
      username: process.env.MAILMAN_USERNAME,
      password: process.env.MAILMAN_PASSWORD,
      from: process.env.MAILMAN_FROM,
      path: process.env.MAILMAN_TO,
    } as MailmanOptions),
);
