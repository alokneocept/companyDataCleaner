import { Injectable, Logger } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Customer } from './sheetModel';

@Injectable()
export class ExcelReader {
  private readonly log = new Logger(ExcelReader.name);
  FILEPATH = './data/companyData.xlsx';
  async readFile(): Promise<Customer[]> {
    try {
      this.log.log('Started reading files');
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(this.FILEPATH);

      const sheet = workbook.worksheets[0];
      const rows = sheet.getSheetValues();
      const headers = rows[0];
      const customers: Customer[] = [];

      for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
        const row = rows[rowIndex];
        const customer = new Customer();
        customer.name = row[0];
        customer.email = row[1];

        customers.push(customer);
      }
      this.log.log('Excel file read successfully.');
      return customers;
    } catch (error) {
      this.log.error('Error while reading Excel file.');
      throw new error('Failed to read Excel file.');
    }
  }
}
