import { NestCacheService } from './services/nest-cache.service';
import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { CACHE_OPTIONS } from './constants';
import {
  CacheAsyncOptions,
  CacheAsyncOptionsFactory,
  CacheOptions,
} from './interfaces';
import { CacheMetadata } from './metadata';

@Module({
  providers: [NestCacheService, CacheMetadata],
  exports: [NestCacheService],
})
export class NestCacheModule {
  static registerAsync(options: CacheAsyncOptions): DynamicModule {
    return {
      global: options.isGlobal || false,
      module: NestCacheModule,
      providers: [
        this.createStorageOptionsProvider(options),
        NestCacheService,
        CacheMetadata,
      ],
    };
  }

  private static createStorageOptionsProvider(
    options: CacheAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: CACHE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    const inject = [
      (options.useClass || options.useExisting) as Type<CacheOptions>,
    ];

    return {
      provide: CACHE_OPTIONS,
      useFactory: async (optionsFactory: CacheAsyncOptionsFactory) =>
        await optionsFactory.createCacheOptions(),
      inject,
    };
  }
}
