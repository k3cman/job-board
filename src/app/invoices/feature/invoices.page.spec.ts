import { ConfirmDialogComponent } from '../../shared/ui/confirm-dialog/confirm-dialog.component';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { JobsBuilder } from '../../jobs/data-access/jobs.builder';
import { InvoicesPageComponent } from './invoices.page';
import { InvoicesStore } from '../store/invoices.store';
import { BehaviorSubject, of } from 'rxjs';
import { InvoicesService } from '../data-access/invoices.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

describe('InvoicesPageComponent', function () {
  let component: InvoicesPageComponent;
  let fixture: ComponentFixture<InvoicesPageComponent>;
  const mockViewModel = new BehaviorSubject({
    loading: false,
    data: [],
    filter: {},
  });

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatDialogModule,
        HttpClientTestingModule,
        CommonModule,
      ],
      declarations: [InvoicesPageComponent],
      providers: [
        {
          provide: InvoicesStore,
          useValue: {
            vm$: mockViewModel.asObservable(),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
          },
        },
        InvoicesService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have vm', async () => {
    component.vm$.subscribe((data) => {
      expect(data).toEqual({
        loading: true,
        data: [],
        filters: {},
      });
    });
  });
});
