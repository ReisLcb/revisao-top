import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaidaPage } from './saida.page';

describe('SaidaPage', () => {
  let component: SaidaPage;
  let fixture: ComponentFixture<SaidaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
