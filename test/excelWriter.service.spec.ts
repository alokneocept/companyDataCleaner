import { ExcelWriter } from 'src/excel/excelWriter.service';
import * as ExcelJS from 'exceljs';

describe('ExcelWriter', () => {
  let excelWriter: ExcelWriter;
  let writeFileMock: jest.Mock;
  let addWorksheetMock: jest.Mock;
  let addRowMock: jest.Mock;

  beforeEach(() => {
    excelWriter = new ExcelWriter();
    writeFileMock = jest.fn();
    addWorksheetMock = jest.fn().mockReturnThis();
    addRowMock = jest.fn().mockReturnThis();

    jest
      .spyOn(ExcelJS.Workbook.prototype.xlsx, 'writeFile')
      .mockImplementation(writeFileMock);
    jest
      .spyOn(ExcelJS.Workbook.prototype, 'addWorksheet')
      .mockImplementation(addWorksheetMock);
    /*  jest.spyOn(ExcelJS.Worksheet.prototype, 'addRow').mockImplementation(addRowMock); */
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should write file with provided data', async () => {
    const data = [
      { companyName: 'neocepts', email: 'alok@neocepts.com' },
      { companyName: 'shauryam', email: 'alok@shauryam.co.in' },
    ];

    await excelWriter.writeFile(data);

    expect(writeFileMock).toHaveBeenCalledWith(excelWriter.FILEPATH);
  });

  it('Should create worksheet with correct name', async () => {
    const data = [
      { companyName: 'neocepts', email: 'alok@neocepts.com' },
      { companyName: 'shauryam', email: 'pawan@shauryam.co.in' },
    ];

    await excelWriter.writeFile(data);

    expect(addWorksheetMock).toHaveBeenCalledWith('Sheet 1');
  });

  it('Should add headers to the worksheet', async () => {
    const data = [
      { companyName: 'neocepts', email: 'alok@neocepts.com' },
      { companyName: 'shauryam', email: 'pawan@shauryam.co.in' },
    ];

    await excelWriter.writeFile(data);

    expect(addRowMock).toHaveBeenCalledWith(['companyName', 'email']);
  });

  it('Should add rows with correct values to the worksheet', async () => {
    const data = [
      { companyName: 'neocepts', email: 'alok@neocepts.com' },
      { companyName: 'shauryam', email: 'pawan@shauryam.co.in' },
    ];

    await excelWriter.writeFile(data);

    expect(addRowMock).toHaveBeenCalledTimes(data.length + 1);
    expect(addRowMock).toHaveBeenNthCalledWith(2, [
      'neocepts',
      'alok@neocepts.com',
    ]);
    expect(addRowMock).toHaveBeenNthCalledWith(2, [
      'shauryam',
      'pawan@shauryam.co.in',
    ]);
  });

  it('Should handle empty data', async () => {
    const data: any[] = [];

    await excelWriter.writeFile(data);

    expect(writeFileMock).toHaveBeenCalledWith(excelWriter.FILEPATH);
  });
});
