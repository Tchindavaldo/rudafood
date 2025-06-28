import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpandTextCardMenuHomeComponent } from './expand-text-card-menu-home.component';

describe('ExpandTextCardMenuHomeComponent', () => {
  let component: ExpandTextCardMenuHomeComponent;
  let fixture: ComponentFixture<ExpandTextCardMenuHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandTextCardMenuHomeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpandTextCardMenuHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
