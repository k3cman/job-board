import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SidebarDialogWrapperComponent } from './sidebar-dialog-wrapper.component';
import { By } from '@angular/platform-browser';

describe('SidebarDialogWrapperComponent', () => {
  let component: SidebarDialogWrapperComponent;
  let fixture: ComponentFixture<SidebarDialogWrapperComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatIcon, MatIconButton],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarDialogWrapperComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have close icon', () => {
    expect(
      fixture.debugElement.query(By.css('mat-icon')).nativeElement,
    ).toBeDefined();
  });

  it('should emit close dialog', () => {
    spyOn(component.closeDialog, 'emit');
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    expect(component.closeDialog.emit).toHaveBeenCalled();
  });

  it('should have title of dialog', () => {
    component.title = 'Create JobAd';
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('span')).nativeElement.innerText,
    ).toEqual('Create JobAd');
  });
});
