import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: ` <p>overview works!</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesPageComponent {}
