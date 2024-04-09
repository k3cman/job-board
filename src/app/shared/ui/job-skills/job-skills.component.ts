import {Component, Input} from '@angular/core';
import {MatChip, MatChipSet} from "@angular/material/chips";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-job-skills',
  standalone: true,
  template: `
    <mat-chip-set>
      <mat-chip *ngFor="let skill of skills">
        {{skill}}
      </mat-chip>
    </mat-chip-set>
  `,
  imports: [
    MatChip,
    MatChipSet,
    NgForOf
  ],
  styleUrl: './job-skills.component.scss'
})
export class JobSkillsComponent {
  @Input() skills: string[] = []

}
