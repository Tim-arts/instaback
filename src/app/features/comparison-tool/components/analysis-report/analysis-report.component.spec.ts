import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisReportComponent } from './analysis-report.component';

describe('AnalysisReport', () => {
  let component: AnalysisReportComponent;
  let fixture: ComponentFixture<AnalysisReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisReportComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
