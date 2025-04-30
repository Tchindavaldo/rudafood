import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatusOrderBuyedComponent } from './status-order-buyed.component';

describe('StatusOrderBuyedComponent', () => {
  let component: StatusOrderBuyedComponent;
  let fixture: ComponentFixture<StatusOrderBuyedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusOrderBuyedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusOrderBuyedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
