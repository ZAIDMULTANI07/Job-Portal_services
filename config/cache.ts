import { CacheOptions } from '@libs/boat';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'cache',
  () =>
    ({
      default: 'redis',
      stores: {
        redis: {
          driver: 'redis',
          host: process.env.REDIS_HOST,
          password: process.env.REDIS_PASSWORD || null,
          port: process.env.REDIS_PORT || 6379,
          database: process.env.REDIS_DB || 0,
          prefix: 'fp-job-project',
        },
      },
    } as CacheOptions),
);
