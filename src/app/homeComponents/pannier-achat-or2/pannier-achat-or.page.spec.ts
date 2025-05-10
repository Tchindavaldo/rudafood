import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PannierAchatOrPage } from './pannier-achat-or.page';

describe('PannierAchatOrPage', () => {
  let component: PannierAchatOrPage;
  let fixture: ComponentFixture<PannierAchatOrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PannierAchatOrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
