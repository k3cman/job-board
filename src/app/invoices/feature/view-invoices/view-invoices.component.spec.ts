import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { InvoicesStore } from '../../store/invoices.store';
import { BehaviorSubject, of } from 'rxjs';
import { InvoicesService } from '../../data-access/invoices.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {
  IViewInvoicesVM,
  ViewInvoicesComponent,
} from './view-invoices.component';

describe('InvoicesPageComponent', function () {
  let component: ViewInvoicesComponent;
  let fixture: ComponentFixture<ViewInvoicesComponent>;
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
      declarations: [ViewInvoicesComponent],
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
    fixture = TestBed.createComponent(ViewInvoicesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have vm', async () => {
    component.vm$.subscribe((data: IViewInvoicesVM) => {
      expect(data).toEqual({
        loading: true,
        data: [],
        filters: {},
      });
    });
  });
});
