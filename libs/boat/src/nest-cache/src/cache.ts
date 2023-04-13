import { CacheDriver } from './interfaces';
import { CacheMetadata } from './metadata';
import { NestCacheService } from './services';

export class Cache {
  static store(store?: string): CacheDriver {
    const options = CacheMetadata.getData();
    return NestCacheService.stores[store || options.default];
  }
}

export function CacheStore(store?: string): CacheDriver {
  const options = CacheMetadata.getData();
  return NestCacheService.stores[store || options.default];
}
