import { Injectable } from '@nestjs/common';
import { ExcelReader } from './excelReder.service';
import { ExcelWriter } from './excelWriter.service';
import { ExtractCompanyNameService } from './extractCompanyName.service';

@Injectable()
export class ExcelService {
  constructor(
    private readonly excelReader: ExcelReader,
    private readonly excelWriter: ExcelWriter,
    private readonly extractCompanyNameService: ExtractCompanyNameService,
  ) {}

  async showExcelData(): Promise<void> {
    const excelData = await this.excelReader.readFile();
    await this.extractCompanyNameService.findCompanyNames(excelData);
    await this.excelWriter.writeFile(process.env.EXCEL_OUTPUTFILE_PATH, excelData);
  }
}
