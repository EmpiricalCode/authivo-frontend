import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTitleContainerComponent } from './page-title-container.component';

describe('PageTitleContainerComponent', () => {
  let component: PageTitleContainerComponent;
  let fixture: ComponentFixture<PageTitleContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageTitleContainerComponent]
    });
    fixture = TestBed.createComponent(PageTitleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
