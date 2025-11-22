import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { FileTypeEnum } from '../../shared/models/file-type.models';
import { AnalysisReportComponent } from './components/analysis-report/analysis-report.component';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { HeaderComponent } from './components/header/header.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { AnalyzerService } from './services/analyzer.service';

@Component({
  selector: 'app-comparison-tool',
  imports: [
    InstructionsComponent,
    HeaderComponent,
    AnalysisReportComponent,
    FileUploadComponent
  ],
  templateUrl: './comparison-tool.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonToolComponent {
  protected readonly analyzerService = inject(AnalyzerService);

  #followersFile = signal<File | undefined>(undefined);
  #followingFile = signal<File | undefined>(undefined);

  protected readonly canAnalyze = linkedSignal(() => {
    if(this.analyzerService.loading()) return false;

    return !!this.#followersFile() && !!this.#followingFile()
  });

  protected readonly followersFileName = signal<string>('');
  protected readonly followingFileName = signal<string>('');

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

  protected analyzeFiles(): void {
    const followersFile = this.#followersFile()!;
    const followingFile = this.#followingFile()!;

    this.analyzerService.analyzeFollowData(followersFile, followingFile).subscribe({
      error: (error) => {
        console.error('Analysis failed:', error);
      }
    });
  }

  protected reset(): void {
    this.analyzerService.clearAnalysis();

    this.#followersFile.set(undefined);
    this.#followingFile.set(undefined);
    this.followersFileName.set('');
    this.followingFileName.set('');
    this.canAnalyze.set(false);
  }

  protected readonly FileTypeEnum = FileTypeEnum;
}
