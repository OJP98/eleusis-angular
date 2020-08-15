import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesFormComponent } from './rules-form.component';

describe('RulesFormComponent', () => {
  let component: RulesFormComponent;
  let fixture: ComponentFixture<RulesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
