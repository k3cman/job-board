import { NgModule } from '@angular/core';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PageHeadComponent } from '@shared/ui/page-head/page-head.component';
import { InvoicesTableComponent } from '../ui/invoices-table/invoices-table.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ViewInvoicesComponent } from './view-invoices/view-invoices.component';

@NgModule({
  declarations: [ViewInvoicesComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    MatTableModule,
    MatButton,
    MatIcon,
    PageHeadComponent,
    InvoicesTableComponent,
    MatProgressSpinner,
  ],
})
export class InvoicesModule {}
