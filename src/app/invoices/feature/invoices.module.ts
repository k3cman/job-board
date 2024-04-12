import { NgModule } from '@angular/core';
import { InvoicesPageComponent } from './invoices.page';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PageHeadComponent } from '../../shared/ui/page-head/page-head.component';
import { InvoicesTableComponent } from '../ui/invoices-table/invoices-table.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [InvoicesPageComponent],
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
