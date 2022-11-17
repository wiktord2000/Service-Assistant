import { EmailMessage } from './../_models/EmailMessage';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor() { }

  postMail(message: EmailMessage){
    return of(true);
  }
}
