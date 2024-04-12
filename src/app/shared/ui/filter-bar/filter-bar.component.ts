import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeyValuePipe, NgForOf, NgIf } from '@angular/common';
import { MatChip, MatChipRow } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { IFilter } from '../../../types/filter';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [KeyValuePipe, MatChip, MatChipRow, MatIcon, NgForOf, NgIf],
  template: `
    <ng-container *ngIf="(filters | keyvalue).length">
      <mat-chip-row>
        <mat-chip
          *ngFor="let filter of filters | keyvalue"
          (click)="removeFilter.emit(filter.key)"
        >
          <div class="flex items-center cursor-pointer">
            <span>{{ filter.key }}: {{ filter.value }}</span>
            <mat-icon class="scale-75">cancel</mat-icon>
          </div>
        </mat-chip>
      </mat-chip-row>
    </ng-container>
  `,
  styleUrl: './filter-bar.component.scss',
})
export class FilterBarComponent {
  @Input() filters!: IFilter;
  @Output() removeFilter = new EventEmitter<string>();
}
