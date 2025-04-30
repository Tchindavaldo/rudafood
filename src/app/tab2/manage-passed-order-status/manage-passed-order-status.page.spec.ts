import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagePassedOrderStatusPage } from './manage-passed-order-status.page';

describe('ManagePassedOrderStatusPage', () => {
  let component: ManagePassedOrderStatusPage;
  let fixture: ComponentFixture<ManagePassedOrderStatusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePassedOrderStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
