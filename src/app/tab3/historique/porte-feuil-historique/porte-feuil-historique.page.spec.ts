import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PorteFeuilHistoriquePage } from './porte-feuil-historique.page';

describe('PorteFeuilHistoriquePage', () => {
  let component: PorteFeuilHistoriquePage;
  let fixture: ComponentFixture<PorteFeuilHistoriquePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PorteFeuilHistoriquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
