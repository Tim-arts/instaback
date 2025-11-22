import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisButtonComponent } from './analysis-button.component';

describe('AnalysisButton', () => {
  let component: AnalysisButtonComponent;
  let fixture: ComponentFixture<AnalysisButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
