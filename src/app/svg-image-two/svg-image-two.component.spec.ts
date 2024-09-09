import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgImageTwoComponent } from './svg-image-two.component';

describe('SvgImageTwoComponent', () => {
  let component: SvgImageTwoComponent;
  let fixture: ComponentFixture<SvgImageTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SvgImageTwoComponent]
    });
    fixture = TestBed.createComponent(SvgImageTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
