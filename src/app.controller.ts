import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service.js';
import { PushNotificationsService } from './push-notifications/push-notifications.service.js';

@Controller()
export class AppController {
  constructor(
    private readonly pushNotificationsService: PushNotificationsService,
  ) {}

  // @Get()
  // getHello() {
  //   return this.appService.getHello();
  // }

  @Post('send-notification')
  sendNotification(@Body() body: { to: string[] }) {
    return this.pushNotificationsService.sendNotification(body.to);
  }
}
