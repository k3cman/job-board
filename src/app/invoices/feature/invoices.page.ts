import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InvoicesService } from '../data-access/invoices.service';
import { Observable } from 'rxjs';
import { InvoiceDto } from '../../types/invoices';

@Component({
  template: `
    <table mat-table [dataSource]="(data$ | async) || []">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let element">{{ element.id }}</td>
      </ng-container>

      <ng-container matColumnDef="dueDate">
        <th mat-header-cell *matHeaderCellDef>dueDate</th>
        <td mat-cell *matCellDef="let element">{{ element.dueDate }}</td>
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesPageComponent {
  data$: Observable<InvoiceDto[]> = this.service.getInvoices();
  displayedColumns = ['id', 'dueDate', 'amount'];
  constructor(private service: InvoicesService) {}
}
