import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesAddComponent } from './recipes-add.component';

describe('RecipesAddComponent', () => {
  let component: RecipesAddComponent;
  let fixture: ComponentFixture<RecipesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
