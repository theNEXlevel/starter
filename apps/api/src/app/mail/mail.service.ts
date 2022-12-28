import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@starter/interfaces';
import { environment } from '../../environments/environment';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserEntity) {
    const url = `${environment.production ? 'https://www.starter.com/' : 'http://localhost:4200/'}auth/confirm?token=${
      user.forgotGuid
    }&email=${user.email}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Starter App! Please Confirm Your Email',
      template: './assets/mail/templates/confirmation',
      context: {
        name: 'New User',
        url,
      },
    });
  }
}
