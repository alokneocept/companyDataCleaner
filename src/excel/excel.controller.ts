
import { Controller, Get } from '@nestjs/common';
import { ExcelReader } from './excelReder.service';
import { ExcelWriter } from './excelWriter.service';
import { ExtractCompanyNameService } from './extractCompanyName.service';

@Controller('excel')
export class ExcelController {
  constructor(
    private readonly excelReader: ExcelReader,
    private readonly excelWriter: ExcelWriter,
    private readonly extractCompanyNameService: ExtractCompanyNameService,
  ) {}

  @Get('showexcel')
  async showExcel(): Promise<any> {
    const excelData = await this.excelReader.readFile();
    await this.extractCompanyNameService.findCompanyNames(excelData);
    await this.excelWriter.writeFile(process.env.EXCEL_OUTPUTFILE_PATH, excelData);
    return excelData;
  }
}
