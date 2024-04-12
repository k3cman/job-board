import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-sidebar-dialog-wrapper',
  standalone: true,
  imports: [MatIcon, MatIconButton],
  template: `
    <div class="w-full h-full flex flex-col p-4">
      <div class="flex justify-between items-center text-lg mb-4">
        <span>{{ title }}</span>
        <button mat-icon-button (click)="closeDialog.emit()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <div class="flex-1">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class SidebarDialogWrapperComponent {
  @Input() title = '';
  @Output() readonly closeDialog = new EventEmitter<void>();
}
