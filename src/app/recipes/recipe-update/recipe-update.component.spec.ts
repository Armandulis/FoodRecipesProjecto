import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeUpdateComponent } from './recipe-update.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {RouterTestingModule} from '@angular/router/testing';
import {RecipesService} from '../shared/recipes.service';
import {FileService} from '../../files/shared/file.service';
import {DOMHelper} from '../../../testing/dom-helper';
import {RecipesAddComponent} from '../recipes-add/recipes-add.component';
import {of} from 'rxjs';
import {Recipe} from '../shared/recipe';
import {Helper} from '../../../testing/recipes-helper';
describe('RecipeUpdateComponent', () => {
  let component: RecipeUpdateComponent;
  let fixture: ComponentFixture<RecipeUpdateComponent>;
  let domHelper: DOMHelper<RecipeUpdateComponent>;
  let reciperServiceMock: any;
  let fileServiceMock: any;
  let helper: Helper;

  beforeEach(async(() => {
    helper = new Helper();
    fileServiceMock = jasmine.createSpyObj('FileService', ['chosenImage']);
    fileServiceMock.chosenImage.and.returnValue(null);
    reciperServiceMock = jasmine.createSpyObj('RecipeService', ['updateRecipe', 'getRecipeWithID']);
    reciperServiceMock.getRecipeWithID.and.returnValues(of([helper.createRecipes(2)]));
    TestBed.configureTestingModule({
      declarations: [ RecipeUpdateComponent,
      ],
      providers: [
        {provide: RecipesService, useValue: reciperServiceMock},
        {provide: FileService, useValue: fileServiceMock},
      ],
      imports: [
        ReactiveFormsModule,
        ImageCropperModule,
        FormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeUpdateComponent);
    component = fixture.componentInstance;
    domHelper = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('Simple HTML Tests', () => {
    it('should contain 9 labels at least: name, portion, type, time,' +
      ' instructions, picture button, ingredients: + its name, amount', () => {
      expect(domHelper.getAllOfElementsByTag('label').length).toBeGreaterThanOrEqual(9);
    });
    it('should contain 4 inputs: name, fileChooser, ingredients name and amount', () => {
      expect(domHelper.getAllOfElementsByTag('input').length).toBe(4);
    });
    it('should contain 1 textArea for Instructions', () => {
      expect(domHelper.getAllOfElementsByTag('textarea').length).toBe(1);
    });
    it('should contain 3 selects: protion, cookTime, type', () => {
      expect(domHelper.getAllOfElementsByTag('select').length).toBe(3);
    });
  });

  describe('add Recipes', () => {
    it('should call addRecipe 1time when add Recipe button is clicked once', () => {
    //  spyOn(component, 'addRecipe');
      domHelper.clickItemsWithName('button', 'Add Recipe');
      fixture.detectChanges();
     // expect(component.addRecipe).toHaveBeenCalledTimes(1);
    });
    it('should call addRecipeWImage from service 1time when add Recipe button is clicked once', () => {
      domHelper.clickItemsWithName('button', 'Add Recipe');
      fixture.detectChanges();
      expect(reciperServiceMock.addRecipeWithImage).toHaveBeenCalledTimes(1);
    });
  });
  describe('Image for Recipe', () => {
    it('should call fileService once after choosing image with filechooser', () => {
     // component.uploadImage(event);
      fixture.detectChanges();
      expect(fileServiceMock.chosenImage).toHaveBeenCalledTimes(1);
    });
  });
});


