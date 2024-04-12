import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobSkillsComponent } from './job-skills.component';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { NgForOf } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('JobSkillsComponent', function () {
  let component: JobSkillsComponent;
  let fixture: ComponentFixture<JobSkillsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatChip, MatChipSet, NgForOf],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSkillsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show multiple chips as skills', () => {
    component.skills = ['123', '321', 'testing'];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('mat-chip')).length).toEqual(3);
  });
});
