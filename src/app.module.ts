import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExcelReader } from './excel/excelReader.service';
import { ExcelWriter } from './excel/excelWriter.service';
import { EmailValidatorService } from './excel/emailValidator.service';
import { ExtractCompanyNameService } from './excel/extractCompanyName.service';
import { ExcelController } from './excel/excel.controller';
import { ExcelService } from './excel/excel.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, ExcelController],
  providers: [
    AppService,
    ExcelReader,
    ExcelWriter,
    EmailValidatorService,
    ExtractCompanyNameService,
    ExcelService,
  ],
})
export class AppModule {}
