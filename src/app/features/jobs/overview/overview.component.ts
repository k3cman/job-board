import { Component } from '@angular/core';
import {JobsService} from "../services/jobs.service";
import {DialogPosition, MatDialog} from "@angular/material/dialog";
import {EditJobComponent} from "../edit-job/edit-job.component";
import {DialogConfig} from "@angular/cdk/dialog";

@Component({
  selector: 'app-overview',
  template: `
    <div>
      <button mat-mini-fab>
        <mat-icon>
          add_circle
        </mat-icon>
      </button>
      <table mat-table [dataSource]="dataSource$ | async">
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef> Title </th>
          <td mat-cell *matCellDef="let element"> {{element.title}} </td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef> Description </th>
          <td mat-cell *matCellDef="let element"> {{element.description}} </td>
        </ng-container>

        <ng-container matColumnDef="skills">
          <th mat-header-cell *matHeaderCellDef> Skills </th>
          <td mat-cell *matCellDef="let element"> {{element.skills | json}} </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef> Status </th>
          <td mat-cell *matCellDef="let element"> {{element.status}} </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let element">
            <button mat-icon-button aria-label="Example icon button with a vertical three dot icon" (click)="editJob(element)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button aria-label="Example icon button with a vertical three dot icon" (click)="deleteJob(element)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
 dataSource$ = this.jobsService.getJobs()
  displayedColumns = ['title', 'description','skills','status', 'actions']
  constructor(
    private jobsService: JobsService,
    private dialog: MatDialog
  ) {

  }

  deleteJob(element:any) {
    //TODO add confirmation dialog
    this.jobsService.deleteJob(element.id).subscribe()
  }

  editJob(element:any) {
    this.dialog.open(EditJobComponent, {
      height:'100vh',
      width:'500px',
      position:{
        top: '0',
        right:'0'
      },
      data: element
    })
  }
}
