import { ClientsService } from '../../_services/clients.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../_models/Client';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  client: Client; 
  isCompany: boolean;
  isUpdated: boolean = false;
  isSaving: boolean = false;

  constructor(private clientsService: ClientsService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadClient();
  }

  editForm : FormGroup = this.formBuilder.group(
    {
      companyName: [ '', [Validators.required]],
      nip: [ '', [Validators.required]],
      firstname: [ '', [Validators.required]],
      lastname: ['', [Validators.required]],
      street: [''],
      city: [''],
      postalCode: [''],
      countryCode: [''],
      phone: [''],
      email: [''],
    }
  );


  loadClient(){

    const clientId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.clientsService.getClient(clientId).subscribe(client => {

      // Store client data
      this.client = client;
      this.isCompany = client.type === 'company';

      // Set previous form values
      this.editForm.setValue({
        companyName: client.companyName,
        nip: client.nip,
        firstname: client.firstname,
        lastname: client.lastname,
        street: client.street,
        city: client.city,
        postalCode: client.postalCode,
        countryCode: client.countryCode,
        phone: client.phone,
        email: client.email
      })
    });
  }
}
