import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent {
  public readonly inputNameLabel = input.required<string>();
  public readonly inputId = input.required<string>();
  public readonly followersFileNameLabel = input.required<string>();

  public readonly changeEvent = output<Event>();
}
