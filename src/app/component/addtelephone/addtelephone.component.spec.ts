import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtelephoneComponent } from './addtelephone.component';

describe('AddtelephoneComponent', () => {
  let component: AddtelephoneComponent;
  let fixture: ComponentFixture<AddtelephoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtelephoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtelephoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
