import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EmailValidatorService {
  async validateEmail(email: string): Promise<boolean> {
    const domain = email.split('@')[1];
    const splitedDomain = domain.split('.');
    const ignoreDomain = splitedDomain[splitedDomain.length - 1].toLowerCase();

    if (ignoreDomain === 'gmail' || ignoreDomain === 'hotmail' || ignoreDomain === 'yahoo' || ignoreDomain === 'rediffmail') {
      return false;
    }

    try {
      await axios.get(`https://${domain}`);
      return true;
    } catch (error) {
      return false;
    }
  }
}
