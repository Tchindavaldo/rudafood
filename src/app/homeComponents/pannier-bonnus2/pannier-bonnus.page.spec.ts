import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PannierBonnusPage } from './pannier-bonnus.page';

describe('PannierBonnusPage', () => {
  let component: PannierBonnusPage;
  let fixture: ComponentFixture<PannierBonnusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PannierBonnusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
