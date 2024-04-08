import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import {InvoicesRouterModule} from "./invoices-router.module";



@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    InvoicesRouterModule
  ]
})
export class InvoicesModule { }
