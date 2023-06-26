import { ExtractCompanyNameService } from 'src/excel/extractCompanyName.service';
import { EmailValidatorService } from 'src/excel/emailValidator.service';

describe('extractCompanyNameService', () => {
  let extractCompanyNameService: ExtractCompanyNameService;
  let emailValidatorService: EmailValidatorService;

  beforeEach(() => {
    emailValidatorService = new EmailValidatorService();
    extractCompanyNameService = new ExtractCompanyNameService(
      emailValidatorService,
    );
  });

  describe('findCompanyNames', () => {
    it('Throw an error if data is not an array', async () => {
      await expect(
        extractCompanyNameService.findCompanyNames(null),
      ).rejects.toThrowError('data must be an array.');
    });

    it('Should find and set company name if email is valid', async () => {
      const rows = [{ Email: 'test@neocepts.com', 'Company name': 'neocepts' }];

      await extractCompanyNameService.findCompanyNames(rows);

      expect(rows[0]['Company name']).toBe('neocepts');
    });

    it('Should log a warning if email is invalid', async () => {
      const rows = [
        { Email: 'alok@shauraya.com', 'Company name': 'shaurya' },
        { Email: 'alok@rai.com', Companyname: 'rai' },
      ];

      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      await extractCompanyNameService.findCompanyNames(rows);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Invalid email: invalidemail',
      );
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);

      consoleWarnSpy.mockRestore();
    });

    it('Should show warning if phone number and email are the same', async () => {
      const rows = [
        { Email: '9874897539', 'Company name': '9874897539' },
        { Email: '8678957769', 'Company name': '8678957769' },
      ];

      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      await extractCompanyNameService.findCompanyNames(rows);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Phone number and email are the same: 9874897539',
      );
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Phone number and email are the same: 8678957769',
      );
      expect(consoleWarnSpy).toHaveBeenCalledTimes(2);

      consoleWarnSpy.mockRestore();
    });
  });

  describe('getCompanyNameFromEmail', () => {
    it('Should extract company name from email', () => {
      const email = 'alok@neocepts.com';
      const companyName =
        extractCompanyNameService.getCompanyNameFromEmail(email);
      expect(companyName).toBe('neocepts');
    });
  });
});
