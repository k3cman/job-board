import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { AsyncPipe, NgIf } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        RouterLink,
        MatIcon,
        MatToolbar,
        MatIconButton,
        MatDrawerContainer,
        MatDrawer,
        MatDrawerContent,
        AsyncPipe,
        NgIf,
      ],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have defined screenSize', waitForAsync(() => {
    component.sidebarOpen$.subscribe((data) => {
      expect(data).toEqual(true);
    });
  }));

  describe('when screen is smaller than 768px', () => {
    beforeEach(() => {
      spyOnProperty(window, 'innerWidth').and.returnValue(760);
      window.dispatchEvent(new Event('resize'));
    });
    it('should set toggleSidebar to false when width smaller than 768px', waitForAsync(() => {
      component.sidebarOpen$.subscribe((data) => {
        expect(data).toEqual(false);
      });
    }));

    it('should set it to true with toggleSidebar function', waitForAsync(() => {
      component.toggleSidebar();
      component.sidebarOpen$.subscribe((data) => {
        expect(data).toEqual(true);
      });
    }));
  });
});
