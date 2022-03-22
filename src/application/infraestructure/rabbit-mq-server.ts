import { Channel, connect, Connection, Message } from 'amqplib';

export class RabbitMqServer {
  private conn: Connection;
  private channel: Channel;

  constructor(private readonly uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  pubToQueue(queue: string, message: string): any {
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  consume(queue: string, callback: (message: Message) => void): any {
    return this.channel.consume(queue, (message) => {
      callback(message);
      this.channel.ack(message);
    });
  }
}
