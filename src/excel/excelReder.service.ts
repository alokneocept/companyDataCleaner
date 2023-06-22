import { Injectable,Logger } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelReader {
  private readonly logger = new Logger(ExcelReader.name);
  FILEPATH = './data/companyData.xlsx';
  async readFile(): Promise<any[]> {
    try{
    this.logger.log('Started reading files');
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(this.FILEPATH);

    const sheet = workbook.worksheets[0];
    const rows = sheet.getSheetValues();
    const headers = rows[0];
    const data = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const rowData = {};
      for (let j = 0; j < Number(headers.length); j++) {
        rowData[headers[j]] = row[j];
      }

      data.push(rowData);
      this.logger.log('Excel file read successfully.');
    }
    return data;
  } catch (error){
    this.logger.error('Error while reading Excel file:', error);
  }
  }
}