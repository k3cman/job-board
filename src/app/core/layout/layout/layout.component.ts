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
import {
  BehaviorSubject,
  debounce,
  debounceTime,
  fromEvent,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
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
        <div class="md:hidden">
          <button
            mat-icon-button
            aria-label="Example icon-button with menu icon"
            (click)="toggleSidebar()"
          >
            <mat-icon>menu</mat-icon>
          </button>
        </div>

        <span>JobAdsB2B</span>
      </mat-toolbar>
      <mat-drawer-container class="h-full">
        <mat-drawer mode="side" [opened]="(screenSize$ | async) || false">
          <div class="w-56 p-4 flex flex-col">
            <a
              routerLink="jobs"
              (click)="toggleSidebar()"
              class="mb-2 p-2 h-8 w-full hover:bg-slate-200 flex items-center text-gray-700"
              ><mat-icon class="mr-2">work</mat-icon>Jobs</a
            >
            <a
              routerLink="invoices"
              (click)="toggleSidebar()"
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
  private _toggleSidebar = new BehaviorSubject(false);

  screenSize$: Observable<boolean> = fromEvent(window, 'resize').pipe(
    debounceTime(300),
    startWith(window.innerWidth),
    switchMap(() => {
      if (window.innerWidth <= 767) {
        return this._toggleSidebar.asObservable();
      } else {
        return of(window.innerWidth >= 767);
      }
    }),
    shareReplay(),
  );

  toggleSidebar() {
    this._toggleSidebar.next(!this._toggleSidebar.getValue());
  }
}
