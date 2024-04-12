import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';

const routes: Routes = [
  {
    path: '',
    component: ViewJobsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
