import { Test, TestingModule } from '@nestjs/testing';
import { NestCacheService } from './nest-cache.service';

describe('NestCacheService', () => {
  let service: NestCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestCacheService],
    }).compile();

    service = module.get<NestCacheService>(NestCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
