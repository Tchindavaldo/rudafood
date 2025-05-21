import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderModalItem2Component } from './order-modal-item2.component';

describe('OrderModalItem2Component', () => {
  let component: OrderModalItem2Component;
  let fixture: ComponentFixture<OrderModalItem2Component>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderModalItem2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
