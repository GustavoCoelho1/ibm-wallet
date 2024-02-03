import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRecipientComponent } from './save-recipient.component';

describe('SaveRecipientComponent', () => {
  let component: SaveRecipientComponent;
  let fixture: ComponentFixture<SaveRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveRecipientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
