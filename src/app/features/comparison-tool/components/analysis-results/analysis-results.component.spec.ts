import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisResultsComponent } from './analysis-results.component';

describe('AnalysisReport', () => {
  let component: AnalysisResultsComponent;
  let fixture: ComponentFixture<AnalysisResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisResultsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisResultsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
