import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanel } from './admin-panel.component';

describe('HomeComponent', () => {
  let component: AdminPanel;
  let fixture: ComponentFixture<AdminPanel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanel ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
