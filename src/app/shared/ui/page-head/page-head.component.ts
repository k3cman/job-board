import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-page-head',
  standalone: true,
  imports: [MatButton, MatIcon, NgIf],
  template: `
    <div class="flex items-center justify-between p-2">
      <div class="text-lg font-bold">{{ pageName }}</div>
      <div>
        <button
          *ngIf="showFiler"
          mat-stroked-button
          (click)="openFilter.emit()"
          class="mr-4"
        >
          <mat-icon>filter_alt</mat-icon>
          Filter
        </button>
        <button
          *ngIf="showCreate"
          mat-stroked-button
          color="primary"
          (click)="openCreate.emit()"
        >
          <mat-icon>add</mat-icon>
          Create
        </button>
      </div>
    </div>
  `,
})
export class PageHeadComponent {
  @Input() pageName = '';
  @Input() showCreate = false;
  @Input() showFiler = false;
  @Output() openFilter = new EventEmitter<void>();
  @Output() openCreate = new EventEmitter<void>();
}
