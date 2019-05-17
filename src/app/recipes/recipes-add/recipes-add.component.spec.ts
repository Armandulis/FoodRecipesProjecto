import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesAddComponent } from './recipes-add.component';
import {DOMHelper} from '../../../testing/dom-helper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCroppedEvent, ImageCropperModule} from 'ngx-image-cropper';
import {RouterTestingModule} from '@angular/router/testing';
import {RecipesService} from '../shared/recipes.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {Recipe} from '../shared/recipe';
import {Location} from '@angular/common';
import {FileService} from '../../files/shared/file.service';

describe('RecipesAddComponent', () => {
  let component: RecipesAddComponent;
  let fixture: ComponentFixture<RecipesAddComponent>;
  let domHelper: DOMHelper<RecipesAddComponent>;
  let reciperServiceMock: any;
  let fileServiceMock: any;
  beforeEach(async(() => {
    fileServiceMock = jasmine.createSpyObj('FileService', ['chosenImage']);
    fileServiceMock.chosenImage.and.returnValue(null);
    reciperServiceMock = jasmine.createSpyObj('RecipeService', ['addRecipeWithImage']);
    reciperServiceMock.addRecipeWithImage.and.returnValues(of([]));
    TestBed.configureTestingModule({
      declarations: [ RecipesAddComponent ],
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
    fixture = TestBed.createComponent(RecipesAddComponent);
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
      spyOn(component, 'addRecipe');
      domHelper.clickItemsWithName('button', 'Add Recipe');
      fixture.detectChanges();
      expect(component.addRecipe).toHaveBeenCalledTimes(1);
    });
    it('should call addRecipeWImage from service 1time when add Recipe button is clicked once', () => {
      domHelper.clickItemsWithName('button', 'Add Recipe');
      fixture.detectChanges();
      expect(reciperServiceMock.addRecipeWithImage).toHaveBeenCalledTimes(1);
    });
  });
  describe('Image for Recipe', () => {
    it('should call fileService once after choosing image with filechooser', () => {
      component.uploadImage(event);
      fixture.detectChanges();
      expect(fileServiceMock.chosenImage).toHaveBeenCalledTimes(1);
    });
  });

  describe('Navigation', () => {
    let location: Location;
    let router: Router;
    let helper: Helper;

    beforeEach(() => {
      location = TestBed.get(Location);
      router =  TestBed.get(Router);
      fixture.detectChanges();
      helper = new Helper();
    });
    it('should navigate to Recipes list after clicking button add recipe', () => {
      reciperServiceMock.addRecipeWithImage.and.returnValues(of(helper.createRecipes(1)));
      domHelper.clickItemsWithName('button', 'Add Recipe');
      expect(location.path()).toBe('/add');
    });
  });
});

class Helper {
  recipesList: Recipe[] = [];

  createRecipes(amount: number): Recipe[]{
    for (let i = 0; i < amount; i++) {
      this.recipesList.push({
        name: 'recipe' + i,
        type: 'fish',
        howTo: 'cook',
        cookTime: 'time: ' + i,
        portion: i + ' people'
      });
    }
     return this.recipesList;
  }
}

