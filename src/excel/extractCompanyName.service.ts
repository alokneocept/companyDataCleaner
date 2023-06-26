import { Injectable, Logger } from '@nestjs/common';
import { EmailValidatorService } from './emailValidator.service';

@Injectable()
export class ExtractCompanyNameService {
  private readonly log = new Logger(ExtractCompanyNameService.name);
  constructor(private readonly emailValidatorService: EmailValidatorService) {}

  async findCompanyNames(rows: object[]): Promise<object[]> {
    if (!Array.isArray(rows)) {
      throw new Error('Data must be an array.');
    }
    for (const row of rows) {
      if (!row['Company name']) {
        const email = row['Email'];
        const phoneNumber = row['PhoneNumber'];

        if (phoneNumber !== email) {
          const validEmail = await this.emailValidatorService.validateEmail(
            email,
          );
          if (validEmail) {
            const companyName = this.getCompanyNameFromEmail(email);
            row['Company name'] = companyName;
            this.log.log(`Company name found: ${companyName}`);
          } else {
            this.log.warn(`Invalid email: ${email}`);
          }
        } else {
          this.log.warn(`Phone number and email are the same: ${phoneNumber}`);
        }
      }
    }
    return rows;
  }

  getCompanyNameFromEmail(email: string): string {
    const domain = email.split('@')[1];
    return domain.split('.')[0];
  }
}
