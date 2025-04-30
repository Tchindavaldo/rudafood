import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BonusOrderBuyedComponent } from './bonus-order-buyed.component';

describe('BonusOrderBuyedComponent', () => {
  let component: BonusOrderBuyedComponent;
  let fixture: ComponentFixture<BonusOrderBuyedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusOrderBuyedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BonusOrderBuyedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
