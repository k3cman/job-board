import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  redirectTo: 'jobs',
  pathMatch: 'full'
},{

    path: 'jobs',
    loadChildren: () => import('./jobs/feature/jobs.module').then(m => m.JobsModule)

},{
  path: 'invoices',
  loadChildren: () => import('./invoices/feature/invoices.module').then(m => m.InvoicesModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
