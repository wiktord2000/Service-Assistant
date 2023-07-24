import { TestBed } from '@angular/core/testing';
import { ClientsService } from './clients.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BASE_URL, CLIENTS, CLIENT_OF_COMPANY_TYPE } from 'src/app/shared/utils/testing-data';
import { HttpErrorResponse } from '@angular/common/http';

describe('ClientsService', () => {
  let clientsService: ClientsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientsService],
      imports: [HttpClientTestingModule]
    });
    clientsService = TestBed.inject(ClientsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should initialize the clientService', () => {
    expect(clientsService).toBeTruthy();
  });

  it('should get all clients', () => {
    clientsService.getClients().subscribe((clients) => {
      expect(clients).toBeTruthy();
      expect(clients.length).toBe(6);
      const client = CLIENT_OF_COMPANY_TYPE;
      expect(client).toBeTruthy();
      expect(client.companyName).toBe('Cieślak i syn');
      expect(client.type).toBe('company');
    });

    const req = httpTestingController.expectOne(BASE_URL + 'clients/');
    expect(req.request.method).toBe('GET');

    req.flush(CLIENTS);
  });

  it('should get all the clients related with the specific vehicle', () => {
    pending();
  });

  it('should get specific client', () => {
    const client = CLIENT_OF_COMPANY_TYPE;

    clientsService.getClient(client.id).subscribe((client) => {
      expect(client).toBeTruthy();
      expect(client.companyName).toBe('Cieślak i syn');
      expect(client.type).toBe('company');
    });

    const req = httpTestingController.expectOne(BASE_URL + 'clients/' + client.id);
    expect(req.request.method).toBe('GET');

    req.flush(client);
  });

  it('should add client', () => {
    const client = CLIENT_OF_COMPANY_TYPE;
    const newId = 12;
    const createdAt = new Date();
    const updatedAt = new Date();

    clientsService.addClient(client).subscribe((client) => {
      expect(client).toBeTruthy();
      expect(client.id).toBe(newId);
      expect(client.companyName).toBe(client.companyName);
      expect(client.type).toBe(client.type);
      expect(client.updatedAt).toBe(updatedAt);
      expect(client.createdAt).toBe(createdAt);
    });

    const req = httpTestingController.expectOne(BASE_URL + 'clients/');
    const reqBody = req.request.body;

    expect(req.request.method).toBe('POST');
    expect(reqBody.id).toBe(client.id);
    expect(reqBody.companyName).toBe(client.companyName);
    expect(reqBody.type).toBe(client.type);
    expect(reqBody.updatedAt).toBe(client.updatedAt);
    expect(reqBody.createdAt).toBe(client.createdAt);

    req.flush({ ...client, id: newId, createdAt, updatedAt });
  });

  it('should update client', () => {
    const client = CLIENT_OF_COMPANY_TYPE;
    const updatedClient = {
      ...client,
      companyName: 'RTS GROUP',
      phone: 567112442,
      firstName: 'John'
    };

    clientsService.updateClient(client.id, updatedClient).subscribe((client) => {
      expect(client).toBeTruthy();
      expect(client.id).toBe(updatedClient.id);
      expect(client.companyName).toBe(updatedClient.companyName);
      expect(client.type).toBe(updatedClient.type);
      expect(client.updatedAt).toBe(updatedClient.updatedAt);
      expect(client.createdAt).toBe(updatedClient.createdAt);
    });

    const req = httpTestingController.expectOne(BASE_URL + 'clients/' + client.id);
    const reqBody = req.request.body;

    expect(req.request.method).toBe('PUT');
    expect(reqBody.id).toBe(updatedClient.id);
    expect(reqBody.companyName).toBe(updatedClient.companyName);
    expect(reqBody.type).toBe(updatedClient.type);
    expect(reqBody.updatedAt).toBe(updatedClient.updatedAt);
    expect(reqBody.createdAt).toBe(updatedClient.createdAt);

    req.flush(updatedClient);
  });

  it('should raise an error if update of the client fails', () => {
    const client = CLIENT_OF_COMPANY_TYPE;
    const updatedClient = {
      ...client,
      companyName: 'RTS GROUP',
      phone: 567112442,
      firstName: 'John'
    };

    clientsService.updateClient(client.id, updatedClient).subscribe({
      next: () => fail('The error is expected'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpTestingController.expectOne(BASE_URL + 'clients/' + client.id);
    expect(req.request.method).toBe('PUT');

    req.flush('Failure to remove the client', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should delete client', () => {
    const client = CLIENT_OF_COMPANY_TYPE;

    clientsService.deleteClient(client.id).subscribe({
      error: () => {
        fail('Should delete the client without errors');
      }
    });

    const req = httpTestingController.expectOne(BASE_URL + 'clients/' + client.id);
    expect(req.request.method).toBe('DELETE');

    req.flush('Deleted successfully', { status: 204, statusText: 'No content' });
  });

  it('should search for clients with "nowi" in the representative name', () => {
    const matchString = 'nowi';

    clientsService.getClientsSearch(2, matchString).subscribe((clients) => {
      expect(clients).toBeTruthy();
      expect(clients.length).toBe(1);
      expect(clients[0].type).toBe('company');
      expect(clients[0].companyName).toBe('Nowicki');
    });

    const req = httpTestingController.expectOne((req) => req.url === BASE_URL + 'clients/search');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('clientsNumber')).toBe('2');
    expect(req.request.params.get('match')).toBe('nowi');

    req.flush([CLIENTS[5]]);
  });

  it('should search for clients with "a" in the representative name', () => {
    const matchString = 'a';

    clientsService.getClientsSearch(3, matchString).subscribe((clients) => {
      expect(clients).toBeTruthy();
      expect(clients.length).toBe(3);
    });

    const req = httpTestingController.expectOne((req) => req.url === BASE_URL + 'clients/search');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('clientsNumber')).toBe('3');
    expect(req.request.params.get('match')).toBe('a');

    req.flush(CLIENTS.slice(0, 3));
  });
});
