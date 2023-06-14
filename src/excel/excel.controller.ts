import { Controller, Get, Post } from '@nestjs/common';
import { ExcelWriter } from './excelWriter.service';
import { ExtractCompanyNameService } from './extractCompanyName.service';
import { ExcelReader } from './excelReder.service';

@Controller('api')
export class ExcelController {
  constructor(
    private readonly excelReader: ExcelReader,
  ) {}
  
    @Get('showexcel')
    async getExcelData(): Promise<any> {
      const excelData = await this.excelReader.readFile();
      return excelData;
    }
  }
  