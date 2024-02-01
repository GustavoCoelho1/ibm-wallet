import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMoneyTransactionComponent } from './delete-money-transaction.component';

describe('DeleteMoneyTransactionComponent', () => {
  let component: DeleteMoneyTransactionComponent;
  let fixture: ComponentFixture<DeleteMoneyTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteMoneyTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteMoneyTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
