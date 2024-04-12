import { InvoicesTableComponent } from './invoices-table.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
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
import { By } from '@angular/platform-browser';

import localeCh from '@angular/common/locales/de-CH';

registerLocaleData(localeCh);

describe('InvoicesTableComponent', () => {
  let component: InvoicesTableComponent;
  let fixture: ComponentFixture<InvoicesTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CurrencyPipe,
        DatePipe,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable,
        MatHeaderCellDef,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesTableComponent);
    component = fixture.componentInstance;

    component.columns = ['id', 'amount'];
    component.tableData = [
      {
        id: '123',
        dueDate: new Date(),
        jobAdId: '321',
        amount: 321,
        jobName: 'Testing',
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
          _embedded: undefined,
        },
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have data', () => {
    expect(component.tableData.length).toEqual(1);
  });

  it('should have proper columns', () => {
    expect(component.columns).toEqual(['id', 'amount']);
  });

  it('to have amount transformed by currency pipe', () => {
    expect(
      fixture.debugElement.queryAll(By.css('.mat-column-amount'))[0]
        .nativeElement.innerText,
    ).toEqual('Amount');

    expect(
      fixture.debugElement.queryAll(By.css('.mat-column-amount'))[1]
        .nativeElement.innerText,
    ).toMatch('321');
  });
});
