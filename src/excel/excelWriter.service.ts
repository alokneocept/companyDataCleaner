import { Injectable,Logger } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelWriter { 
  private readonly logger = new Logger(ExcelWriter.name);
   FILEPATH = process.env.EXCEL_OUTPUTFILE_PATH;
  async writeFile(FILEPATH, data: any[]): Promise<void> {
 try{
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Sheet 1');

    const headers = Object.keys(data[0]);
    sheet.addRow(headers);

    for (const row of data) {
      const values = [];
      for (const header of headers) {
        values.push(row[header]);
      }
      sheet.addRow(values);
    }
    await workbook.xlsx.writeFile(this.FILEPATH);
    this.logger.log('File successfully written to ${this.FILEPATH}');
  } catch (error) {
    this.logger.error("Error while writing file", error);

  }
}
  }
