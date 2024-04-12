import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { JobsBuilder } from '../../../jobs/data-access/jobs.builder';
import { By } from '@angular/platform-browser';

describe('ConfirmDialog', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

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
          useValue: JobsBuilder.new().withId('test').withTitle('name').build(),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display item title', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('mat-dialog-content')).nativeElement
        .innerText,
    ).toEqual('Are you sure you want to delete name Job Ad ');
  });

  describe('action buttons', () => {
    it('should emit false when clicked cancel', () => {
      spyOn(component, 'handleConfirmation');
      const button = fixture.debugElement.queryAll(By.css('button'))[0]
        .nativeElement;
      button.click();

      expect(component.handleConfirmation).toHaveBeenCalledWith(false);
    });

    it('should emit true when clicked confirm', () => {
      spyOn(component, 'handleConfirmation');
      const button = fixture.debugElement.queryAll(By.css('button'))[1]
        .nativeElement;
      button.click();

      expect(component.handleConfirmation).toHaveBeenCalledWith(true);
    });
  });
});
