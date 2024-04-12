import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { InvoiceViewModel } from '../../data-access/invoices';

@Component({
  selector: 'app-invoices-table',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
  ],
  template: `
    <table mat-table [dataSource]="tableData">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let element">{{ element.id }}</td>
      </ng-container>

      <ng-container matColumnDef="jobName">
        <th mat-header-cell *matHeaderCellDef>JobAD name</th>
        <td mat-cell *matCellDef="let element">
          {{ element.jobName }}
        </td>
      </ng-container>

      <ng-container matColumnDef="dueDate">
        <th mat-header-cell *matHeaderCellDef>Due Date</th>
        <td mat-cell *matCellDef="let element">
          {{ element.dueDate | date: undefined : undefined : 'de-CH' }}
        </td>
      </ng-container>

      <ng-container matColumnDef="amount">
        <th mat-header-cell *matHeaderCellDef>Amount</th>
        <td mat-cell *matCellDef="let element">
          {{
            element.amount | currency: 'CHF' : 'symbol' : undefined : 'de-CH'
          }}
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns"></tr>
    </table>
  `,
})
export class InvoicesTableComponent {
  @Input() columns!: string[];
  @Input() tableData!: InvoiceViewModel[];
}
