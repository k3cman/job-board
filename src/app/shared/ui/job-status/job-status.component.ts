import { Component, Input } from '@angular/core';
import { JobAdStatus } from '../../../types/jobs';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-job-status',
  standalone: true,
  imports: [UpperCasePipe],
  template: `
    <div
      [class]="
        'w-30 px-2 py-1 border rounded-full text-center bg-opacity-30 ' +
        statusColors[status]
      "
    >
      {{ status | uppercase }}
    </div>
  `,
  styleUrl: './job-status.component.scss',
})
export class JobStatusComponent {
  statusColors = {
    draft: 'bg-blue-200 bg-opacity-30',
    published: 'bg-green-200 bg-opacity-30',
    archived: 'bg-red-200 bg-opacity-30',
  };
  @Input() status!: JobAdStatus;
}

// <div
//   [class]="
// 'w-24 h-3/4 flex items-center justify-center p-2 border rounded' +
// statusColors[status]
// "
// >
