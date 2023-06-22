import { Injectable } from '@nestjs/common';
import { ExcelReader } from './excelReder.service';
import { ExcelWriter } from './excelWriter.service';
import { ExtractCompanyNameService } from './extractCompanyName.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class ExcelService {
  private readonly logger = new Logger(ExcelService.name)
  constructor(
    private readonly excelReader: ExcelReader,
    private readonly excelWriter: ExcelWriter,
    private readonly extractCompanyNameService: ExtractCompanyNameService,
  ) {}

  async showExcel(): Promise<void> {
    try{
    const rows = await this.excelReader.readFile();
    await this.extractCompanyNameService.findCompanyNames(rows);
    
    await this.excelWriter.writeFile(rows);
    } catch (error) {
      this.logger.error('Error occurred while processing the Excel file:', error);
    }
  }
}
