import { NgModule } from '@angular/core';
import { InvoicesPageComponent } from './invoices.page';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [InvoicesPageComponent],
  imports: [CommonModule, InvoicesRoutingModule],
})
export class InvoicesModule {}
