import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <div class="flex flex-col h-full w-full">
      <div class="h-12 border-b">JOBS B2B portal</div>
      <div class="flex h-full">
        <div class="w-1/6 border-r p-4 flex flex-col">
            <a routerLink="jobs">Jobs</a>
            <a routerLink="invoices">Invoices</a>
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
