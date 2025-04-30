import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CmdActionPage } from './cmd-action.page';

describe('CmdActionPage', () => {
  let component: CmdActionPage;
  let fixture: ComponentFixture<CmdActionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CmdActionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
