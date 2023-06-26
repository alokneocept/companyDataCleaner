import { Injectable, Logger } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelWriter {
  private readonly log = new Logger(ExcelWriter.name);
  FILEPATH = './data/newCompanyData.xlsx';
  async writeFile(data: object[]): Promise<void> {
    try {
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
      this.log.log('File successfully written to ${this.FILEPATH}');
    } catch (error) {
      this.log.error('Error while writing file.');
      throw new error('Failed to write the file.');
    }
  }
}
