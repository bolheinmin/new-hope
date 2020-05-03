import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatFilterComponent } from './meat-filter.component';

describe('MeatFilterComponent', () => {
  let component: MeatFilterComponent;
  let fixture: ComponentFixture<MeatFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeatFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeatFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
