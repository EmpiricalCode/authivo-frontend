import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueComponent } from './continue.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContinueComponent', () => {
  let component: ContinueComponent;
  let fixture: ComponentFixture<ContinueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ContinueComponent]
    });
    fixture = TestBed.createComponent(ContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
