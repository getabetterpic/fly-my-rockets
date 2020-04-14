import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RocketDialogComponent } from './rocket-dialog.component';

describe('RocketDialogComponent', () => {
  let component: RocketDialogComponent;
  let fixture: ComponentFixture<RocketDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RocketDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RocketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
