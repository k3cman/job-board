import { JobFormComponent } from './job-form.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { NgForOf, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatChipGrid, MatChipInput, MatChipRow } from '@angular/material/chips';
import { By } from '@angular/platform-browser';

describe('JobFormComponent', () => {
  let component: JobFormComponent;
  let fixture: ComponentFixture<JobFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatButton,
        MatChipInput,
        NgForOf,
        MatChipGrid,
        MatIcon,
        MatChipRow,
        MatHint,
        MatError,
        NgIf,
      ],
      providers: [FormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have Create keyword in buttons when not in edit mode', () => {
    component.editMode = false;
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('.mdc-button__label'));
    expect(buttons[0].nativeElement.innerText).toEqual('Create');
    expect(buttons[1].nativeElement.innerText).toEqual('Create and Publish');
  });

  it('should have Update keyword in buttons when in edit mode', () => {
    component.editMode = true;
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('.mdc-button__label'));
    expect(buttons[0].nativeElement.innerText).toEqual('Update');
    expect(buttons[1].nativeElement.innerText).toEqual('Update and Publish');
  });

  it('should have form', () => {
    component.form.patchValue({
      title: 'Testing',
    });
    fixture.detectChanges();
    const titleInput = fixture.debugElement.queryAll(By.css('input'))[0];
    expect(titleInput.nativeElement.value).toBe('Testing');
  });

  describe('Form validation', () => {
    it('should be invalid if form is empty', async () => {
      const button = fixture.debugElement.queryAll(By.css('button'));
      button[1].nativeElement.click();
      fixture.whenStable().then(() => {
        expect(component.form.invalid).toBe(true);
      });
    });

    it('should be invalid when description is under 10 characters', async () => {
      const button = fixture.debugElement.queryAll(By.css('button'));
      button[1].nativeElement.click();
      component.form.patchValue({
        title: 'test',
        description: 'test',
      });
      fixture.whenStable().then(() => {
        expect(component.form.invalid).toBe(true);
      });
    });
  });

  xit('should submit job ad when everything is valid', async () => {
    spyOn(component, 'submitJobAd');

    component.form.patchValue({
      title: 'Testing',
      description: 'Long Descriptions',
    });

    const button = fixture.debugElement.queryAll(By.css('button'));
    button[1].nativeElement.click();

    fixture.whenStable().then(() => {
      expect(component.submitJobAd.emit).toHaveBeenCalled();
    });
  });
});
