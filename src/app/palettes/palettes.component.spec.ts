import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalettesComponent } from './palettes.component';

describe('PalettesComponent', () => {
  let component: PalettesComponent;
  let fixture: ComponentFixture<PalettesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PalettesComponent]
    });
    fixture = TestBed.createComponent(PalettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
