import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisDriver } from '../drivers';
import { CacheDriver } from '../interfaces';
import { CacheMetadata } from '../metadata';

@Injectable()
export class NestCacheService implements OnModuleInit {
  static stores: Record<string, CacheDriver>;

  onModuleInit() {
    const { stores } = CacheMetadata.getData();
    NestCacheService.stores = {};
    for (const store in stores) {
      NestCacheService.stores[store] = new RedisDriver(stores[store]);
    }
  }
}
