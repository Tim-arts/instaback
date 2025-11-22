import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-analysis-button',
  imports: [],
  templateUrl: './analysis-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisButtonComponent {
  public readonly isAnalysisTriggered = input.required<boolean>();
  public readonly canAnalyze = input.required<boolean>();
  public readonly isLoading = input.required<boolean>();

  public readonly startAnalysis = output<void>();

  protected readonly buttonClasses = computed(() => {
    const classes: string[] = [
      'w-full',
      'p-4',
      'text-white',
      'rounded-lg',
      'font-semibold',
      'transition-colors',
      'mt-4',
    ];

    if (this.isAnalysisTriggered() || !this.canAnalyze()) {
      classes.push('bg-gray-300', 'cursor-not-allowed');
    } else {
      classes.push('bg-blue-500', 'hover:bg-blue-600', 'cursor-pointer');
    }

    return classes.join(' ');
  });
}
