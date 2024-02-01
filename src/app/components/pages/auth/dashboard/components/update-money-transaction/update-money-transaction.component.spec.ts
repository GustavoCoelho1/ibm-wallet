import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMoneyTransactionComponent } from './update-money-transaction.component';

describe('UpdateMoneyTransactionComponent', () => {
  let component: UpdateMoneyTransactionComponent;
  let fixture: ComponentFixture<UpdateMoneyTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateMoneyTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateMoneyTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
