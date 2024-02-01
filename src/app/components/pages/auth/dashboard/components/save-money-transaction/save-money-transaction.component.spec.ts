import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMoneyTransactionComponent } from './save-money-transaction.component';

describe('SaveMoneyTransactionComponent', () => {
  let component: SaveMoneyTransactionComponent;
  let fixture: ComponentFixture<SaveMoneyTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveMoneyTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveMoneyTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
