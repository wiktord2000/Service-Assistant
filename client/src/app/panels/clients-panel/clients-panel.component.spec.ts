import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsPanelComponent } from './clients-panel.component';

describe('ClientsPanelComponent', () => {
  let component: ClientsPanelComponent;
  let fixture: ComponentFixture<ClientsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
