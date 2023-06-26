import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class EmailValidatorService {
  private readonly IGNORED_EMAIL = ['gmail | yahoo | hotmail | rediffmail'];
  private readonly log = new Logger(EmailValidatorService.name);
  async validateEmail(email: string): Promise<boolean> {
    const domain = email.split('@')[1];
    const splitedDomain = domain.split('.');
    const ignoreDomain = splitedDomain[splitedDomain.length - 2].toLowerCase();

    if (this.IGNORED_EMAIL.includes(ignoreDomain)) {
      this.log.log('Email ${email} is in the ignored domain.');
      return false;
    }

    try {
      await axios.get('https://${domain}');
      this.log.log('Email ${email} is valid.');
      return true;
    } catch (error) {
      this.log.error('Failed to validate email ${email}');
      throw new error('Domain is not valid.');
      return false;
    }
  }
}
