import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FollowAnalysis } from '../../models/comparison-tool.models';

@Component({
  selector: 'app-analysis-report',
  imports: [],
  templateUrl: './analysis-report.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalysisReportComponent {
  public analysis = input.required<FollowAnalysis>();

  public readonly resetAnalysis = output<void>();

  readonly notFollowingBackCount = computed(() =>
    this.analysis().notFollowingBack.length ?? 0
  );
}
