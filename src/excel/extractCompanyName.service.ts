import { Injectable,Logger } from '@nestjs/common';
import { EmailValidatorService } from './emailValidator.service';

@Injectable()
export class ExtractCompanyNameService {
  private readonly logger = new Logger(ExtractCompanyNameService.name);
  constructor(private readonly emailValidatorService: EmailValidatorService) {}
   
  async findCompanyNames(rows: any[]): Promise<void> {
    if (!Array.isArray(rows)) {
      throw new Error('data must be an array.');
    } 
    for (const row of rows) {
      if (!row['Company name']) {
        const email = row['Email'];
        const phoneNumber = row['PhoneNumber'];

        if (phoneNumber !== email) {
          const validEmail = await this.emailValidatorService.validateEmail(email);
          if (validEmail) {
            const companyName = this.getCompanyNameFromEmail(email);
            row['Company name'] = companyName;
            this.logger.log(`Company name found: ${companyName}`);
          }
          else {
            this.logger.warn(`Invalid email: ${email}`);
          }
        } else {
          this.logger.warn(`Phone number and email are the same: ${phoneNumber}`);
        }
        }
    
      }
  }

   getCompanyNameFromEmail(email: string): string {
    const domain = email.split('@')[1];
    return domain.split('.')[0];
  }
}
