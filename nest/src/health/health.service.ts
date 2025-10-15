import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  liveness(): string {
    return 'OK!';
  }

  readiness(): string {
    return 'OK!';
  }
}
