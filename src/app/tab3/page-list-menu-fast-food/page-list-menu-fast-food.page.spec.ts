import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageListMenuFastFoodPage } from './page-list-menu-fast-food.page';

describe('PageListMenuFastFoodPage', () => {
  let component: PageListMenuFastFoodPage;
  let fixture: ComponentFixture<PageListMenuFastFoodPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListMenuFastFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
