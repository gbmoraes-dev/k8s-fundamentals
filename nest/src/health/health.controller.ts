import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) { }

  @Get('/healthz')
  getLiveness(): string {
    return this.healthService.liveness();
  }

  @Get('/readyz')
  getReadiness(): string {
    return this.healthService.readiness();
  }
}
