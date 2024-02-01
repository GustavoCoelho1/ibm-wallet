import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveLargeScaleMoneyTransactionComponent } from './save-large-scale-money-transaction.component';

describe('SaveLargeScaleMoneyTransactionComponent', () => {
  let component: SaveLargeScaleMoneyTransactionComponent;
  let fixture: ComponentFixture<SaveLargeScaleMoneyTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveLargeScaleMoneyTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveLargeScaleMoneyTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
