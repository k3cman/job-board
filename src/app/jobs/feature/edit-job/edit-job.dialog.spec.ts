import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { EditJobDialogComponent } from './edit-job.dialog';
import { JobsBuilder } from '../../data-access/jobs.builder';

describe('EditJobDialog', function () {
  let component: EditJobDialogComponent;
  let fixture: ComponentFixture<EditJobDialogComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: (dialogResult: boolean) => {
              return dialogResult;
            },
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: JobsBuilder.new()
            .withId('123')
            .withTitle('Test')
            .withDescription('Description')
            .withStatus('draft')
            .withSkills(['testing']),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
