import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FilterJobsComponent } from './filter-jobs.component';

describe('FilterJobsComponent', () => {
  let component: FilterJobsComponent;
  let fixture: ComponentFixture<FilterJobsComponent>;

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
          useValue: { title: '123' },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterJobsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have form', () => {
    expect(component.form).toBeDefined();
  });

  it('should patch value if there is intiial value', () => {
    expect(component.form.get('title')?.value).toEqual('123');
  });

  it('should be able to clear filters', async () => {
    component.clearFilters();
    expect(component.form.getRawValue()).toEqual({
      title: null,
      description: null,
      skills: null,
      status: null,
    });
  });
});
