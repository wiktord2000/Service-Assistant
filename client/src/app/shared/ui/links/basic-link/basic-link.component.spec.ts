import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLinkComponent } from './basic-link.component';

describe('BasicLinkComponent', () => {
  let component: BasicLinkComponent;
  let fixture: ComponentFixture<BasicLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicLinkComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
