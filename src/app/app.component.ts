import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-layout>
      <router-outlet />
    </app-layout>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'job-board';
}
