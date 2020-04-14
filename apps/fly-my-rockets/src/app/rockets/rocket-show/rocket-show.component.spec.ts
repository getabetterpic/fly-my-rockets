import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RocketShowComponent } from './rocket-show.component';

describe('RocketShowComponent', () => {
  let component: RocketShowComponent;
  let fixture: ComponentFixture<RocketShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RocketShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RocketShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
