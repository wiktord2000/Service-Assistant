import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesPanelComponent } from './services-panel.component';

describe('ServicesPanelComponent', () => {
  let component: ServicesPanelComponent;
  let fixture: ComponentFixture<ServicesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
