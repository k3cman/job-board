import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {OverviewComponent} from "./overview/overview.component";

@NgModule({
  imports:[RouterModule.forChild([{
    path: '',
    component: OverviewComponent
  }])],
  exports: [RouterModule]
})
export class InvoicesRouterModule{}
