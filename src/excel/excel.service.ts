import { Injectable } from '@nestjs/common';
import { ExcelReader } from './excelReder.service';
import { ExcelWriter } from './excelWriter.service';
import { ExtractCompanyNameService } from './extractCompanyName.service';
import { EmailValidatorService } from './emailValidator.service';

@Injectable()
export class ExcelService {
    FILEPATH = './data/companyDAta.xlsx';
  constructor(
    private readonly excelReader: ExcelReader,
    private readonly excelWriter:ExcelWriter,
    private readonly extractCompanyName: ExtractCompanyNameService,
    private readonly emailValidatorService: EmailValidatorService,
  ) {}

  async processExcelFile(filePath: string): Promise<void> {
    const data = await this.excelReader.readFile();

    await this.extractCompanyName.findCompanyNames(data);

     this.extractCompanyName.getCompanyNameFromEmail ;

    await this.excelWriter.writeFile('newCompanyData.xlsx', data);
  }
}
