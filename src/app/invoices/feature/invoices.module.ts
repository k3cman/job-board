import { NgModule } from '@angular/core';
import { InvoicesPageComponent } from './invoices.page';
import { InvoicesRoutingModule } from './invoices-routing.module';

@NgModule({
  declarations: [InvoicesPageComponent],
  imports: [InvoicesRoutingModule],
})
export class InvoicesModule {}
