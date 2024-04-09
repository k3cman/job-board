import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDialogWrapperComponent } from './sidebar-dialog-wrapper.component';

describe('SidebarDialogWrapperComponent', () => {
  let component: SidebarDialogWrapperComponent;
  let fixture: ComponentFixture<SidebarDialogWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarDialogWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarDialogWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
