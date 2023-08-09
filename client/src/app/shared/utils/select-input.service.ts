import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class SelectInputService {
  abstract requestMatchingValues(matchValue: string): Observable<any[]>;
  abstract selectedValueToString(selectedValue: any): string;
}
