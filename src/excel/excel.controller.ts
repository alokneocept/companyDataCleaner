import { Controller, Get, Logger } from '@nestjs/common';
import { ExcelService } from './excel.service';
@Controller('excel')
export class ExcelController {
  private readonly log = new Logger(ExcelController.name);
  constructor(private readonly excelService: ExcelService) {}

  @Get('showexcel')
  async generateExcel(): Promise<void> {
    try {
      const sheetData = await this.excelService.showExcel();
      return sheetData;
    } catch (error) {
      this.log.error('Error occurred while uploading the Excel file.');
      throw new error('Failed to load data.');
    }
  }
}
