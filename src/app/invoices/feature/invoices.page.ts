import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InvoicesStore } from '../store/invoices.store';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="!vm.loading; else loading">
        <app-page-head pageName="Invoices"></app-page-head>
        <ng-container *ngIf="vm.data.length; else noData">
          <div class="bg-white p-4">
            <app-invoices-table
              [columns]="displayedColumns"
              [tableData]="vm.data"
            ></app-invoices-table>
          </div>
        </ng-container>
      </ng-container>
    </ng-container>

    <ng-template #noData>
      <div class="w-full h-full flex items-center justify-center flex flex-col">
        <img class="w-1/3 h-1/3" src="assets/no-data.svg" />
        <span class="text-2xl font-bold mt-10 text-slate-400"
          >You have no Invoices right now.</span
        >
      </div>
    </ng-template>

    <ng-template #loading>
      <div class="w-full h-full flex items-center justify-center">
        <mat-spinner></mat-spinner></div
    ></ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [InvoicesStore],
})
export class InvoicesPageComponent {
  vm$ = this.store.vm$;
  displayedColumns = ['id', 'jobName', 'dueDate', 'amount'];
  constructor(private store: InvoicesStore) {}
}
