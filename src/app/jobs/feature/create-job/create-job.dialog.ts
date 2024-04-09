import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  template: `
    <app-job-form></app-job-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateJobDialogComponent{}
