import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { SES, SNS } from 'aws-sdk';

@Injectable()
export class AwsService {
  constructor(
    @InjectAwsService(SES)
    private readonly ses: SES,

    @InjectAwsService(SNS)
    private readonly sns: SNS,
  ) {}

  async exec(incomingFromQueue: {
    type: string;
    payload: object;
  }): Promise<any> {
    switch (incomingFromQueue.type) {
      case 'email':
        return this.email(incomingFromQueue.payload)
          .then()
          .catch((err) => console.error(err));
      case 'sms':
        return this.sms(incomingFromQueue.payload);
    }
  }

  async email(payload: any): Promise<any> {
    await this.ses.sendEmail(payload).promise();
  }

  async sms(payload: any = {}) {
    // implement
  }
}
