import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getK8s(): string {
    console.log(process.env.API_KEY)
    return `Hi K8s, i'm running in ${process.env.ENVIRONMENT} environment!!!`;
  }
}
