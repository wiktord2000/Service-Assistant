import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from '../../core/models/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusesService {
  constructor(private http: HttpClient) {}

  updateStatus(status: Status) {
    return this.http.put<Status>(`${environment.apiUrl}statuses/${status.id}`, status);
  }
}
