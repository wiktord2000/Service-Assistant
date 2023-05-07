import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsTableComponent } from './clients-table.component';

describe('ClientsTableComponent', () => {
  let component: ClientsTableComponent;
  let fixture: ComponentFixture<ClientsTableComponent>;
  // let myService: MyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientsTableComponent],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
      // providers: [{ provide: MyService, useValue: {} }],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // myService = TestBed.inject(MyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
