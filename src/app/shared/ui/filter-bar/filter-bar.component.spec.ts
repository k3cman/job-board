import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FilterBarComponent } from './filter-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeyValuePipe, NgForOf, NgIf } from '@angular/common';
import { MatChip, MatChipRow } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('FilterBarComponent', () => {
  let component: FilterBarComponent;
  let fixture: ComponentFixture<FilterBarComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        KeyValuePipe,
        MatChip,
        MatChipRow,
        MatIcon,
        NgForOf,
        NgIf,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show chips', () => {
    component.filters = {
      title: 'testing',
      status: 'draft',
    };
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('mat-chip')).length).toBe(2);
  });

  it('should emit remove filter', () => {
    spyOn(component.removeFilter, 'emit');
    component.filters = {
      title: 'testing',
      status: 'draft',
    };
    fixture.detectChanges();
    const chip = fixture.debugElement.queryAll(By.css('mat-chip'))[0]
      .nativeElement;
    chip.click();
    fixture.detectChanges();

    expect(component.removeFilter.emit).toHaveBeenCalled();
  });
});
