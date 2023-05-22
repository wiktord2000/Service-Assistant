import { Injectable } from '@angular/core';
import {
  DEFAULT_TABLE_HEADER_HEIGHT,
  DEFAULT_TABLE_ROW_HEIGHT
} from 'src/app/core/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {}

  calculateMinHeight(heightInRows: number) {
    return DEFAULT_TABLE_HEADER_HEIGHT + heightInRows * DEFAULT_TABLE_ROW_HEIGHT;
  }
}
