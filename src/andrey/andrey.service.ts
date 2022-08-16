import { Injectable } from '@nestjs/common';

@Injectable()
export class AndreyService {
  hello() {
    return 'Andrey piska';
  }
}
