import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemPendingToBuyOrderComponent } from './item-pending-to-buy-order.component';

describe('ItemPendingToBuyOrderComponent', () => {
  let component: ItemPendingToBuyOrderComponent;
  let fixture: ComponentFixture<ItemPendingToBuyOrderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPendingToBuyOrderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemPendingToBuyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
