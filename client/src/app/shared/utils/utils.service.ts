import { Injectable } from '@angular/core';
import {
  DEFAULT_TABLE_HEADER_HEIGHT,
  DEFAULT_TABLE_ROW_HEIGHT
} from 'src/app/core/constants/constants';
import { Client } from 'src/app/core/models/Client';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {}

  calculateTableHeight(heightInRows: number) {
    return DEFAULT_TABLE_HEADER_HEIGHT + heightInRows * DEFAULT_TABLE_ROW_HEIGHT;
  }

  clientToString(client: Client): string {
    return client.type === 'company'
      ? client.companyName
      : client.firstname + ' ' + client.lastname;
  }
}
