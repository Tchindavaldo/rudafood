import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageDispoPage } from './page-dispo.page';

describe('PageDispoPage', () => {
  let component: PageDispoPage;
  let fixture: ComponentFixture<PageDispoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDispoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
