import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderModalItem3Component } from './order-modal-item3.component';

describe('OrderModalItem3Component', () => {
  let component: OrderModalItem3Component;
  let fixture: ComponentFixture<OrderModalItem3Component>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderModalItem3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
