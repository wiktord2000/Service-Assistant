import { Injectable } from '@angular/core';
import { DEFAULT_TABLE_HEADER_HEIGHT, DEFAULT_TABLE_ROW_HEIGHT } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class TableHelpersService {
  constructor() {}
  calculateMinHeight(heightInRows: number) {
    return DEFAULT_TABLE_HEADER_HEIGHT + heightInRows * DEFAULT_TABLE_ROW_HEIGHT;
  }
}
