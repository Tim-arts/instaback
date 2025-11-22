import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FileTypeEnum } from '../../models/file-type.models';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent {
  public readonly inputNameLabel = input.required<string>();
  public readonly inputId = input.required<string>();
  public readonly fileNameLabel = input.required<string>();
  public readonly fileType = input.required<FileTypeEnum>();

  public readonly changeEvent = output<Event>();

  protected readonly fileNameLabelComputed = computed(() => {
    const _fileNameLabel = this.fileNameLabel();

    if(_fileNameLabel) return _fileNameLabel;

    return {
      [FileTypeEnum.FOLLOWING]: 'following.json',
      [FileTypeEnum.FOLLOWERS]: 'followers.json',
    }[this.fileType()] ?? '';
  });
}
