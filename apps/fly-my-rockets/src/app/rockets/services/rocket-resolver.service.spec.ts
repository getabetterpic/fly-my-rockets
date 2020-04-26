import { RocketResolverService } from './rocket-resolver.service';

describe('RocketResolverService', () => {
  let service: RocketResolverService;
  let rocketService;

  beforeEach(() => {
    rocketService = {};
    service = new RocketResolverService(rocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
