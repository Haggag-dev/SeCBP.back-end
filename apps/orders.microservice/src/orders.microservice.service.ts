import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersMicroserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
