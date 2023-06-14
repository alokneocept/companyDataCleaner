import { Injectable } from '@nestjs/common';
import { EmailValidatorService } from './emailValidator.service';

@Injectable()
export class ExtractCompanyNameService {
  constructor(private readonly emailValidatorService: EmailValidatorService) {}
   
  async findCompanyNames(rows: any[]): Promise<void> {
    for (const row of rows) {
      if (!row['Company name']) {
        const email = row['Email'];
        const phoneNumber = row['PhoneNumber'];

        if (phoneNumber !== email) {
          const validEmail = await this.emailValidatorService.validateEmail(email);
          if (validEmail) {
            const companyName = this.getCompanyNameFromEmail(email);
            row['Company name'] = companyName;
          }
        }
        }
      }
  }

   getCompanyNameFromEmail(email: string): string {
    const domain = email.split('@')[1];
    return domain.split('.')[0];
  }
}
