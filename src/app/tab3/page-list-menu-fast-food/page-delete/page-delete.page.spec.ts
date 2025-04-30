import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageDeletePage } from './page-delete.page';

describe('PageDeletePage', () => {
  let component: PageDeletePage;
  let fixture: ComponentFixture<PageDeletePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
