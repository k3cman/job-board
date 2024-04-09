import {Component, Input} from '@angular/core';
import {JobAdStatus} from "../../../types/jobs";

@Component({
  selector: 'app-job-status',
  standalone: true,
  imports: [],
  template: `
    <p class="p-1 border border-slate-700 bg-slate-200 rounded text-slate-700 text-center">
      {{status}}
    </p>
  `,
  styleUrl: './job-status.component.scss'
})
export class JobStatusComponent {
  @Input() status!: JobAdStatus
}
