import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    MatIcon
  ],
  template: `
    <div class="flex flex-col h-full w-full">
      <div class="h-12 border-b p-4 ml-2 flex items-center"><mat-icon color="primary">diversity_1</mat-icon> <span class="ml-4 font-bold text-slate-700">JobBoard B2B</span></div>
      <div class="flex h-full">
        <div class="w-56 border-r p-4 flex flex-col">
            <a routerLink="jobs" class="mb-2 p-2 h-8 w-full hover:bg-slate-200 flex items-center text-gray-700"><mat-icon class="mr-2">work</mat-icon>Jobs</a>
            <a routerLink="invoices" class="mb-2 p-2 h-8 w-full hover:bg-slate-200 flex items-center text-gray-700"><mat-icon class="mr-2">payments</mat-icon>Invoices</a>
        </div>
        <div class="w-full h-full">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
