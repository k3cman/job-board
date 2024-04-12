import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceDto } from '../../types/invoices';
import { InvoicesStore } from '../store/invoices.store';
import { InvoiceViewModel } from '../data-access/invoices';

@Component({
  template: `
    <div class="flex items-center justify-between p-2">
      <div class="text-lg">Invoices</div>
    </div>
    <div class="bg-white p-4">
      <table mat-table [dataSource]="(data$ | async) || []">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let element">{{ element.id }}</td>
        </ng-container>

        <ng-container matColumnDef="jobName">
          <th mat-header-cell *matHeaderCellDef>jobName</th>
          <td mat-cell *matCellDef="let element">
            {{ element.jobName }}
          </td>
        </ng-container>

        <ng-container matColumnDef="dueDate">
          <th mat-header-cell *matHeaderCellDef>dueDate</th>
          <td mat-cell *matCellDef="let element">
            {{ element.dueDate | date: undefined : undefined : 'de-CH' }}
          </td>
        </ng-container>

        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef>amount</th>
          <td mat-cell *matCellDef="let element">
            {{
              element.amount | currency: 'CHF' : 'symbol' : undefined : 'de-CH'
            }}
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [InvoicesStore],
})
export class InvoicesPageComponent {
  data$: Observable<InvoiceViewModel[]> = this.store.data$;
  displayedColumns = ['id', 'jobName', 'dueDate', 'amount'];
  constructor(private store: InvoicesStore) {}
}
