import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-layout>
      <router-outlet />
    </app-layout>
  `,
})
export class AppComponent {}
