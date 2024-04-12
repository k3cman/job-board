import { NgModule } from '@angular/core';
import { InvoicesPageComponent } from './invoices.page';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { CommonModule } from '@angular/common';
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
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [InvoicesPageComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    MatTable,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatButton,
    MatIcon,
  ],
})
export class InvoicesModule {}
