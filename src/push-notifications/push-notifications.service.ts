import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import Expo, { ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';

@Injectable()
export class PushNotificationsService {
  private readonly expo = new Expo({
    // accessToken: process.env.EXPO_ACCESS_TOKEN,
  });

  async sendNotification(toTokens: string[]) {
    const areExpoTokens = toTokens.every((token) =>
      Expo.isExpoPushToken(token),
    );

    if (!areExpoTokens) {
      throw new BadRequestException(
        'There are strings that are no expo tokens',
      );
    }

    const messages: ExpoPushMessage[] = toTokens.map((token) => ({
      to: token,
      sound: 'default',
      title: 'Notificacion de prueba',
      body: 'Esto fue enviado desde mi servidor de prueba',
      data: {
        chatId: 'XYZ-123',
      },
    }));

    const chunks = this.expo.chunkPushNotifications(messages);
    const tickets: ExpoPushTicket[] = [];

    for (const chunk of chunks) {
      try {
        const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          'Error sending push notifications chunks',
        );
      }
    }

    return {
      done: true,
    };
  }
}
