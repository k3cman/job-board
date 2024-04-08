import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import {JobsRoterModule} from "./jobs-roter.module";
import {
  MatTableModule
} from "@angular/material/table";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {EditJobComponent} from "./edit-job/edit-job.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    OverviewComponent,
    EditJobComponent
  ],
  imports: [
    CommonModule,
    JobsRoterModule,
    MatTableModule,
    MatIcon,
    MatMiniFabButton,
    MatIconButton,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton
  ]
})
export class JobsModule { }
