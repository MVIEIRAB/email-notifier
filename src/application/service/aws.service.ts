import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { SES } from 'aws-sdk';

@Injectable()
export class AwsService {
  constructor(
    @InjectAwsService(SES)
    private readonly ses: SES,
  ) {}

  async exec(incomingFromQueue: {
    type: string;
    payload: object;
  }): Promise<any> {
    return this.email(incomingFromQueue.payload)
      .then()
      .catch((err) => console.error(err));
  }

  async email(payload: any): Promise<any> {
    try {
      const data = await this.ses.sendEmail(payload).promise();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
