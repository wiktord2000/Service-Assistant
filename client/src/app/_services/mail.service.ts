import { EmailMessage } from './../_models/EmailMessage';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private baseUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  postMail(message: EmailMessage) {
    return this.http.post<EmailMessage>(this.baseUrl + 'mail/', message);
  }
}
