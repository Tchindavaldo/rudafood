import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmProcesingOrderItem1Component } from './confirm-procesing-order-item1.component';

describe('ConfirmProcesingOrderItem1Component', () => {
  let component: ConfirmProcesingOrderItem1Component;
  let fixture: ComponentFixture<ConfirmProcesingOrderItem1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmProcesingOrderItem1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmProcesingOrderItem1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
