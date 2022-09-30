import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsPanelComponent } from './parts-panel.component';

describe('PartsPanelComponent', () => {
  let component: PartsPanelComponent;
  let fixture: ComponentFixture<PartsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
