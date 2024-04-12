import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { fromEvent, map, startWith } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    MatIcon,
    MatToolbar,
    MatIconButton,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    AsyncPipe,
    NgIf,
  ],
  template: `
    <div class="flex flex-col h-full w-full">
      <mat-toolbar>
        <button
          mat-icon-button
          class="example-icon"
          aria-label="Example icon-button with menu icon"
        >
          <mat-icon>menu</mat-icon>
        </button>
        <span>JobAdsB2B</span>
      </mat-toolbar>
      <mat-drawer-container
        class="h-full"
        *ngIf="screenSize$ | async as screenSize"
      >
        <mat-drawer mode="side" [opened]="screenSize > 768">
          <div class="w-56 p-4 flex flex-col">
            <a
              routerLink="jobs"
              class="mb-2 p-2 h-8 w-full hover:bg-slate-200 flex items-center text-gray-700"
              ><mat-icon class="mr-2">work</mat-icon>Jobs</a
            >
            <a
              routerLink="invoices"
              class="mb-2 p-2 h-8 w-full hover:bg-slate-200 flex items-center text-gray-700"
              ><mat-icon class="mr-2">payments</mat-icon>Invoices</a
            >
          </div>
        </mat-drawer>
        <mat-drawer-content class="p-4">
          <ng-content></ng-content>
        </mat-drawer-content>
      </mat-drawer-container>
    </div>
  `,
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  screenSize$ = fromEvent(window, 'resize').pipe(
    startWith(window.innerWidth),
    map(() => window.innerWidth),
  );
}
