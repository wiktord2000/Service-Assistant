import { ClientsService } from '../../_services/clients.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../_models/Client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  client: Client; 

  constructor(private clientsService: ClientsService,
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient(){

    const clientId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.clientsService.getClient(clientId).subscribe(client => {
      this.client = client;
    });
  }
}
