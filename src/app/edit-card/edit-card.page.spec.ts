import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardPage } from './edit-card.page';

describe('EditCardPage', () => {
  let component: EditCardPage;
  let fixture: ComponentFixture<EditCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
