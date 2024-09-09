import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgImageOneComponent } from './svg-image-one.component';

describe('SvgImageOneComponent', () => {
  let component: SvgImageOneComponent;
  let fixture: ComponentFixture<SvgImageOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SvgImageOneComponent]
    });
    fixture = TestBed.createComponent(SvgImageOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
