import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelWriter { 
   FILEPATH = './data/newCompanyData.xlsx';
  async writeFile(_FILEPATH: any, data: any[]): Promise<void> {
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
  }
}
