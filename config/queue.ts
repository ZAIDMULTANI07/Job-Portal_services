import { registerAs } from '@nestjs/config';
import { QueueOptions, SyncQueueDriver } from '@libs/boat';
export default registerAs('queue', () => {
  return {
    default: 'notifications',
    connections: {
      notifications: {
        driver: SyncQueueDriver,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        database: +process.env.REDIS_DB || 0,
        queue: process.env.REDIS_QUEUE || 'fp-jobs-queue',
      },
    },
  } as QueueOptions;
});
