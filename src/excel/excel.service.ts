import { Injectable, Logger } from '@nestjs/common';
import { ExcelReader } from './excelReader.service';
import { ExcelWriter } from './excelWriter.service';
import { ExtractCompanyNameService } from './extractCompanyName.service';

@Injectable()
export class ExcelService {
  private readonly log = new Logger(ExcelService.name);
  constructor(
    private readonly excelReader: ExcelReader,
    private readonly excelWriter: ExcelWriter,
    private readonly extractCompanyNameService: ExtractCompanyNameService,
  ) {}

  async showExcel(): Promise<void> {
    try {
      const rows = await this.excelReader.readFile();
      await this.extractCompanyNameService.findCompanyNames(rows);
      const newData = await this.excelWriter.writeFile(rows);
      return newData;
    } catch (error) {
      this.log.error('Error occurred while processing the Excel file.');
      throw new error('Failed to process data.');
    }
  }
}
