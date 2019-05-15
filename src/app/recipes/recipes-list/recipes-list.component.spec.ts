import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesListComponent } from './recipes-list.component';
import {Recipe} from '../shared/recipe';
import {DOMHelper} from '../../../testing/dom-helper';
import {RecipeUpdateComponent} from '../recipe-update/recipe-update.component';
import {RecipesDetailsComponent} from '../recipes-details/recipes-details.component';
import {of} from 'rxjs';
import {RecipesService} from '../shared/recipes.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {RouterTestingModule} from '@angular/router/testing';
import {Helper} from '../../../testing/recipes-helper';

describe('RecipesListComponent', () => {
  let component: RecipesListComponent;
  let fixture: ComponentFixture<RecipesListComponent>;
  let domHelper: DOMHelper<RecipeUpdateComponent>;
  let reciperServiceMock: any;
  let helper: Helper;

  beforeEach(async(() => {
    helper = new Helper();
    reciperServiceMock = jasmine.createSpyObj('RecipeService', ['getRecipes']);
    reciperServiceMock.getRecipes.and.returnValues(of([helper.createRecipes(2)]));
    TestBed.configureTestingModule({
      declarations: [ RecipesListComponent ],
      providers: [
        {provide: RecipesService, useValue: reciperServiceMock},
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

