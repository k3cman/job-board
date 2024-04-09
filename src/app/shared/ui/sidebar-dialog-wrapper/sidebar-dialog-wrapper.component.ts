import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sidebar-dialog-wrapper',
  standalone: true,
  imports: [],
  template: `
    <div class="w-full h-full flex flex-col p-4">
      <div class="text-lg mb-4">{{title}}</div>
      <div class="flex-1">
        <ng-content>
        </ng-content>
      </div>
    </div>
  `,
  styleUrl: './sidebar-dialog-wrapper.component.scss'
})
export class SidebarDialogWrapperComponent {
  @Input() title = '';
}
