import { EmailValidatorService } from 'src/excel/emailValidator.service';
import axios from 'axios';

jest.mock('axios');

describe('email validator', () => {
  let emailValidatorService: EmailValidatorService;

  beforeEach(() => {
    emailValidatorService = new EmailValidatorService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('return true for a valid email', async () => {
    const email = 'alokrai@neocepts.com';
   /* axios.get.mockResolvedValueOnce('valid domain'); */
    const isValid = await emailValidatorService.validateEmail(email);
    expect(isValid).toBe(true);
    expect(axios.get).toHaveBeenCalledWith('https://neocepts.com');
  });

  it('return false for an ignored email', async () => {
    const email = 'alokrai@gmail.com';
    const isValid = await emailValidatorService.validateEmail(email);
    expect(isValid).toBe(false);
    expect(axios.get).not.toHaveBeenCalled();
  });

  it('return false for an invalid email domain', async () => {
    const email = 'alok@rai.com';
   /* axios.get.mockRejectedValueOnce(new Error('Invalid domain')); */
    const isValid = await emailValidatorService.validateEmail(email);
    expect(isValid).toBe(false);
    expect(axios.get).toHaveBeenCalledWith('https://rai.com');
  });
});
