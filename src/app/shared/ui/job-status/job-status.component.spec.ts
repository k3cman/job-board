import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobStatusComponent } from './job-status.component';
import { UpperCasePipe } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('JobStatusComponent', () => {
  let component: JobStatusComponent;
  let fixture: ComponentFixture<JobStatusComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, UpperCasePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobStatusComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display status in uppercase', () => {
    component.status = 'draft';
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('div')).nativeElement.innerText,
    ).toEqual('DRAFT');
  });

  it('should have blue css classes when its draft', () => {
    component.status = 'draft';
    fixture.detectChanges();
    const classes = fixture.debugElement.query(By.css('div')).nativeElement
      .classList;
    expect(classes.toString()).toEqual(
      'bg-blue-200 bg-opacity-30 border px-2 py-1 rounded-full text-center w-30',
    );
  });

  it('should have green css classes when its draft', () => {
    component.status = 'published';
    fixture.detectChanges();
    const classes = fixture.debugElement.query(By.css('div')).nativeElement
      .classList;
    expect(classes.toString()).toEqual(
      'bg-green-200 bg-opacity-30 border px-2 py-1 rounded-full text-center w-30',
    );
  });

  it('should have red css classes when its draft', () => {
    component.status = 'archived';
    fixture.detectChanges();
    const classes = fixture.debugElement.query(By.css('div')).nativeElement
      .classList;
    expect(classes.toString()).toEqual(
      'bg-opacity-30 bg-red-200 border px-2 py-1 rounded-full text-center w-30',
    );
  });
});
