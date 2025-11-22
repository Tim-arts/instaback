import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { AnalysisResultsInterface } from '../../models/comparison-tool.models';

@Component({
  selector: 'app-analysis-results',
  imports: [],
  templateUrl: './analysis-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalysisResultsComponent {
  public result = input.required<AnalysisResultsInterface>();

  public readonly resetAnalysis = output<void>();

  protected readonly notFollowingBackCount = computed(() =>
    this.result().notFollowingBack.length ?? 0
  );
}
