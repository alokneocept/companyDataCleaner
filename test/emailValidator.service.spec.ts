import { EmailValidatorService } from 'src/excel/emailValidator.service';
import axios from 'axios';

jest.mock('axios');

describe('Email validator', () => {
  let emailValidatorService: EmailValidatorService;

  beforeEach(() => {
    emailValidatorService = new EmailValidatorService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Return true for a valid email', async () => {
    const email = 'alokrai@neocepts.com';
    const mockResponse = {
      response: {
        valid: true,
      },
    };
    axios.get.mockResolvedValueOnce(mockResponse);
    const isValid = await emailValidatorService.validateEmail(email);
    expect(isValid).toBe(true);
    expect(axios.get).toHaveBeenCalledWith('https://neocepts.com');
  });

  it('Return false for an ignored email', async () => {
    const email = 'alokrai@gmail.com';
    const isValid = await emailValidatorService.validateEmail(email);
    expect(isValid).toBe(false);
    expect(axios.get).not.toHaveBeenCalled();
  });

  it('Return false for an invalid email domain', async () => {
    const email = 'alok@rai.com';
    const mockedError = new Error('Invalid email');
    axios.get.mockRejectedValueOnce(mockedError);
    const isValid = await emailValidatorService.validateEmail(email);
    expect(isValid).toBe(false);
    expect(axios.get).toHaveBeenCalledWith('https://rai.com');
  });
});
