import { Controller, Get,Logger } from '@nestjs/common';
import { ExcelService } from './excel.service';
@Controller('excel')
export class ExcelController {
  private readonly logger = new Logger(ExcelController.name);
  constructor(private readonly excelService: ExcelService) {}

  @Get()
  async generateExcel(): Promise<void> {
    try {
      await this.excelService.showExcel();
    } catch (error) {
      this.logger.error('Error occurred while processing the Excel file:', error);
    }
  }
}
