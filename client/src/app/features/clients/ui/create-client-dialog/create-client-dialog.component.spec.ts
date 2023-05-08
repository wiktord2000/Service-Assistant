import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateClientDialogComponent } from './create-client-dialog.component';

describe('CreateClientDialogComponent', () => {
  let component: CreateClientDialogComponent;
  let fixture: ComponentFixture<CreateClientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateClientDialogComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
