import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExcelReader } from './excel/excelReder.service';
import { ExcelWriter } from './excel/excelWriter.service';
import { EmailValidatorService } from './excel/emailValidator.service';
import { ExtractCompanyNameService } from './excel/extractCompanyName.service';
import { ExcelController } from './excel/excel.controller'
import { ExcelService } from './excel/excel.service';

@Module({
  imports: [],
  controllers: [AppController,ExcelController],
  providers: [AppService,ExcelReader,ExcelWriter,EmailValidatorService,ExtractCompanyNameService,ExcelService],
})
export class AppModule {}
