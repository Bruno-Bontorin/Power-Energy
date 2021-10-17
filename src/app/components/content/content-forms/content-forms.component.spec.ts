import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFormsComponent } from './content-forms.component';

describe('ContentFormsComponent', () => {
  let component: ContentFormsComponent;
  let fixture: ComponentFixture<ContentFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
