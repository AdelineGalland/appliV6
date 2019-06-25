import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCardPage } from './new-card.page';

describe('NewCardPage', () => {
  let component: NewCardPage;
  let fixture: ComponentFixture<NewCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
