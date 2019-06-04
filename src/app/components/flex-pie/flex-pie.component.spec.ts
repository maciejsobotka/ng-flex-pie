import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexPieComponent } from './flex-pie.component';

describe('FlexPieComponent', () => {
  let component: FlexPieComponent;
  let fixture: ComponentFixture<FlexPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
