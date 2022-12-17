import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@starter/interfaces';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserEntity) {
    const url = `starter.com/auth/confirm?token=${user.accessToken}&email=${user.email}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Starter App! Please Confirm Your Email',
      template: '/assets/mail/templates/confirmation',
      context: {
        name: 'New User',
        url,
      },
    });
  }
}
