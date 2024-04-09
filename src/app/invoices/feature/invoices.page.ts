import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InvoicesService } from '../data-access/invoices.service';

@Component({
  template: ` <p>{{ data$ | async | json }}</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesPageComponent {
  data$ = this.service.getInvoices();
  constructor(private service: InvoicesService) {}
}
