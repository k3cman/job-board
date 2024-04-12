import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { JobsPageComponent } from './jobs.page';
import { JobsService } from '../../data-access/jobs.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateJobDialogComponent } from '../create-job/create-job.dialog';
import { JobsBuilder } from '../../data-access/jobs.builder';
import { EditJobDialogComponent } from '../edit-job/edit-job.dialog';
import { ConfirmDialogComponent } from '@shared/ui/confirm-dialog/confirm-dialog.component';
import { FilterJobsComponent } from '../filter-jobs/filter-jobs.component';

describe('JobsPageComponent', function () {
  let component: JobsPageComponent;
  let fixture: ComponentFixture<JobsPageComponent>;
  let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' }; // attach componentInstance to the spy object...

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatDialogModule,
        HttpClientTestingModule,
        CommonModule,
        MatProgressSpinner,
        RouterTestingModule,
      ],
      declarations: [JobsPageComponent],
      providers: [
        MatDialog,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
          },
        },
        JobsService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsPageComponent);
    component = fixture.componentInstance;
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(
      dialogRefSpyObj,
    );
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should change columns array when window changes', waitForAsync(() => {
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    component.columns$.subscribe((data) => {
      expect(data).toEqual(['title', 'status', 'actions']);
    });
  }));

  it('should have all columns initialy', waitForAsync(() => {
    component.columns$.subscribe((data) => {
      expect(data).toEqual([
        'title',
        'description',
        'skills',
        'status',
        'actions',
      ]);
    });
  }));

  it('should open create', () => {
    expect(component.handleCreateJob).toBeDefined();
    component.handleCreateJob();
    expect(dialogSpy).toHaveBeenCalledWith(CreateJobDialogComponent, {
      height: '100vh',
      width: '500px',
      position: {
        top: '0',
        right: '0',
      },
    });

    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should open update', () => {
    expect(component.handleEditJob).toBeDefined();
    const job = JobsBuilder.new().withId('123').withTitle('title').build();
    component.handleEditJob(job);
    expect(dialogSpy).toHaveBeenCalledWith(EditJobDialogComponent, {
      height: '100vh',
      width: '500px',
      position: {
        top: '0',
        right: '0',
      },
      data: job,
    });
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should open delete confirmation dialog', () => {
    expect(component.deleteJob).toBeDefined();
    const job = JobsBuilder.new().withId('123').withTitle('title').build();
    component.deleteJob(job);
    expect(dialogSpy).toHaveBeenCalledWith(ConfirmDialogComponent, {
      data: job,
    });
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should open filter', () => {
    expect(component.openFilter).toBeDefined();
    component.openFilter({});
    expect(dialogSpy).toHaveBeenCalledWith(FilterJobsComponent, {
      height: '100vh',
      width: '500px',
      position: {
        top: '0',
        right: '0',
      },
      data: {},
    });
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });
});
