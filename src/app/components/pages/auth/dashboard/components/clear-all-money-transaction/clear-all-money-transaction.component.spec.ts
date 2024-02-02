import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearAllMoneyTransactionComponent } from './clear-all-money-transaction.component';

describe('ClearAllMoneyTransactionComponent', () => {
  let component: ClearAllMoneyTransactionComponent;
  let fixture: ComponentFixture<ClearAllMoneyTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClearAllMoneyTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClearAllMoneyTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
