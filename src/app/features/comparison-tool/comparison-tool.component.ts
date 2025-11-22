import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { DEFAULT_FOLLOWERS_LABEL, DEFAULT_FOLLOWING_LABEL } from './comparison-tool';
import { AnalysisButtonComponent } from './components/analysis-button/analysis-button.component';
import { AnalysisResultsComponent } from './components/analysis-results/analysis-results.component';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { HeaderComponent } from './components/header/header.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { AnalyzerService } from './services/analyzer.service';

@Component({
  selector: 'app-comparison-tool',
  imports: [
    InstructionsComponent,
    HeaderComponent,
    AnalysisResultsComponent,
    FileUploadComponent,
    AnalysisButtonComponent
  ],
  templateUrl: './comparison-tool.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonToolComponent {
  readonly #analyzerService = inject(AnalyzerService);

  protected readonly canAnalyze = linkedSignal(() => {
    if(this.analysisResults.isLoading()) return false;
    return !!this.#followersFile() && !!this.#followingFile();
  });

  #followersFile = signal<File | undefined>(undefined);
  #followingFile = signal<File | undefined>(undefined);
  protected readonly followersFileName = signal<string>(DEFAULT_FOLLOWERS_LABEL);
  protected readonly followingFileName = signal<string>(DEFAULT_FOLLOWING_LABEL);
  protected readonly isAnalysisTriggered = signal<boolean>(false);

  protected readonly analysisResults = rxResource({
    params: () => ({
      followers: this.#followersFile(),
      following: this.#followingFile(),
      isAnalysisTriggered: this.isAnalysisTriggered(),
    }),
    stream: ({ params }) => {
      const { followers, following, isAnalysisTriggered } = params;

      if (!followers || !following || !isAnalysisTriggered) return of(undefined);

      return this.#analyzerService.analyzeData$(followers, following);
    },
    defaultValue: undefined
  });

  protected onFollowersFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.#followersFile.set(file);
      this.followersFileName.set(file.name);
    }
  }

  protected onFollowingFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.#followingFile.set(file);
      this.followingFileName.set(file.name);
    }
  }

  protected onStartAnalysis(): void {
    this.isAnalysisTriggered.set(true);
  }

  protected reset(): void {
    // this.#followersFile.set(undefined);
    // this.#followingFile.set(undefined);
    // this.followersFileName.set(DEFAULT_FOLLOWERS_LABEL);
    // this.followingFileName.set(DEFAULT_FOLLOWING_LABEL);
    // this.canAnalyze.set(false);
    // this.isAnalysisTriggered.set(false);

    window.location.reload();
  }
}
