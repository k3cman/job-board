import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InvoicesStore } from '../store/invoices.store';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="!vm.loading; else loading">
        <app-page-head pageName="Invoices"></app-page-head>
        <div class="bg-white p-4">
          <app-invoices-table
            [columns]="displayedColumns"
            [tableData]="vm.data"
          ></app-invoices-table>
        </div>
      </ng-container>
    </ng-container>
    <ng-template #loading> Loading </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [InvoicesStore],
})
export class InvoicesPageComponent {
  vm$ = this.store.vm$;
  displayedColumns = ['id', 'jobName', 'dueDate', 'amount'];
  constructor(private store: InvoicesStore) {}
}
