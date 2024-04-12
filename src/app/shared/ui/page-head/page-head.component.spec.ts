import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIf } from '@angular/common';
import { PageHeadComponent } from './page-head.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('PageHeadComponent', () => {
  let component: PageHeadComponent;
  let fixture: ComponentFixture<PageHeadComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatButton, MatIcon, NgIf],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeadComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show page title', () => {
    component.pageName = 'Testing page';
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.text-lg')).nativeElement.innerText,
    ).toEqual('Testing page');
  });

  it('should have 2 buttons if both inputs are true', () => {
    component.showCreate = true;
    component.showFiler = true;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('button')).length).toEqual(2);
  });

  describe('emit filter and create', () => {
    beforeEach(() => {
      component.showCreate = true;
      component.showFiler = true;
      fixture.detectChanges();
    });

    it('should emit openFilter', () => {
      spyOn(component.openFilter, 'emit');
      fixture.debugElement.queryAll(By.css('button'))[0].nativeElement.click();
      fixture.detectChanges();
      expect(component.openFilter.emit).toHaveBeenCalled();
    });

    it('should emit openCreate', () => {
      spyOn(component.openCreate, 'emit');
      fixture.debugElement.queryAll(By.css('button'))[1].nativeElement.click();
      fixture.detectChanges();
      expect(component.openCreate.emit).toHaveBeenCalled();
    });
  });
});
