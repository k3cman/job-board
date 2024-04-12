import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { JobsTableComponent } from './jobs-table.component';
import { JobSkillsComponent } from '../../../shared/ui/job-skills/job-skills.component';
import { JobStatusComponent } from '../../../shared/ui/job-status/job-status.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { NgIf } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { JobsBuilder } from '../../data-access/jobs.builder';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatMenuHarness } from '@angular/material/menu/testing';

describe('JobsTableComponent', () => {
  let component: JobsTableComponent;
  let fixture: ComponentFixture<JobsTableComponent>;
  let loader: HarnessLoader;
  const data = [
    JobsBuilder.new()
      .withId('123')
      .withTitle('Testing 1')
      .withDescription('Testing 1')
      .withStatus('draft')
      .build(),
    JobsBuilder.new()
      .withId('1234')
      .withTitle('Testing 2')
      .withDescription('Testing 2')
      .withStatus('published')
      .build(),
    JobsBuilder.new()
      .withId('12345')
      .withTitle('Testing 3')
      .withDescription('Testing 3')
      .withStatus('archived')
      .build(),
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        JobSkillsComponent,
        JobStatusComponent,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatIcon,
        MatIconButton,
        MatMenu,
        MatMenuItem,
        MatRow,
        MatRowDef,
        MatTable,
        MatHeaderCellDef,
        MatMenuTrigger,
        NgIf,
      ],
      providers: [FormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsTableComponent);
    component = fixture.componentInstance;

    component.columns = ['title', 'description', 'skills', 'status', 'actions'];
    component.tableData = data;

    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have proper columns', () => {
    expect(component.columns).toEqual([
      'title',
      'description',
      'skills',
      'status',
      'actions',
    ]);
  });

  describe('action items', async () => {
    let menu: MatMenuHarness;
    beforeEach(async () => {
      menu = await loader.getHarness(
        MatMenuHarness.with({ selector: `[data-testid="action-button"]` }),
      );
    });

    it('should have open action menu', async () => {
      expect(await menu.isOpen()).toBe(false);
      await menu.open();
      expect(await menu.isOpen()).toBe(true);
    });

    it('should emit status change', async () => {
      spyOn(component.statusChange, 'emit');
      await menu.open();
      const items = await menu.getItems();
      await items[0].click();
      expect(component.statusChange.emit).toHaveBeenCalled();
    });

    it('should emit edit change', async () => {
      spyOn(component.editJob, 'emit');
      await menu.open();
      const items = await menu.getItems();
      await items[1].click();
      expect(component.editJob.emit).toHaveBeenCalled();
    });

    it('should emit delete change', async () => {
      spyOn(component.deleteJob, 'emit');
      await menu.open();
      const items = await menu.getItems();
      await items[2].click();
      expect(component.deleteJob.emit).toHaveBeenCalled();
    });
  });
});
