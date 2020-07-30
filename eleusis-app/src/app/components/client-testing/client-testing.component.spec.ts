import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTestingComponent } from './client-testing.component';

describe('ClientTestingComponent', () => {
  let component: ClientTestingComponent;
  let fixture: ComponentFixture<ClientTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
