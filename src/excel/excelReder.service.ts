import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelReader {
  FILEPATH = './data/companyData.xlsx';
  async readFile(): Promise<any[]> {
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
    }

    return data;
  }
}
