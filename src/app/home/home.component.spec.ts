import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {DOMHelper} from '../../testing/dom-helper';
import {RecipesAddComponent} from '../recipes/recipes-add/recipes-add.component';
import {of} from 'rxjs';
import {CarouselModule} from 'ngx-bootstrap';
import {Recipe} from '../recipes/shared/recipe';
import {RouterTestingModule} from '@angular/router/testing';
import {RecipesService} from '../recipes/shared/recipes.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let domHelper: DOMHelper<HomeComponent>;
  let recipesServiceMock: any;
  let helper: Helper;

  beforeEach(async(() => {

    helper = new Helper();
    recipesServiceMock = jasmine.createSpyObj('RecipeService', ['getAmountOfRecipes']);
    recipesServiceMock.getAmountOfRecipes.and.returnValues([]);
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        {provide: RecipesService, useValue: recipesServiceMock},
      ],
      imports: [
        CarouselModule.forRoot(),
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    domHelper = new DOMHelper(fixture);
  });

  describe('Simple HTML Tests', () => {
    it('should contain 1 <p> for websites description', () => {
      expect(domHelper.getAllOfElementsByTag('p').length).toBeGreaterThanOrEqual(1);
    });
    it('should contain 1 carousel', () => {
      expect(domHelper.getAllOfElementsByTag('carousel').length).toBe(1);
    });
    it('should contain 3 slides inside 1 carousel', () => {
      expect(domHelper.getAllOfElementsByTag('slide').length).toBe(3);
    });
    it('should contain h4 tag inside each slide', () => {
      expect(domHelper.getAllOfElementsByTag('h4').length).toBe(3);
    });
    it('should contain h5 tag inside recipe examples', () => {
      recipesServiceMock.getAmountOfRecipes.and.returnValue(helper.createRecipes(1));
      component.ngOnInit();
      fixture.detectChanges();
      expect(domHelper.getAllOfElementsByTag('h5').length).toBe(1);
    });
    it('should contain 5 h5 tag inside recipe examples', () => {
      recipesServiceMock.getAmountOfRecipes.and.returnValue(helper.createRecipes(5));
      component.ngOnInit();
      fixture.detectChanges();
      expect(domHelper.getAllOfElementsByTag('h5').length).toBe(5);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('load page and OnInit', () => {
    it('should call getAmountOfRecipes once on ngOnInit', () => {
      fixture.detectChanges();
      expect(recipesServiceMock.getAmountOfRecipes).toHaveBeenCalledTimes(1);
    });

    it('should show 4 img tags, 3 slides, 1recipe when cereals with image url is loaded async from cereals service', () => {
      recipesServiceMock.getAmountOfRecipes.and.returnValue(helper.createRecipes(1));

      helper.recipesList[0].url = 'wow';
      component.ngOnInit();
      fixture.detectChanges();
      expect(domHelper.getAllOfElementsByTag('img').length).toBe(4);
    });
    it('should show 3 img tags only for slides when recipes with no image url is loaded onInit from recipe service', () => {
      recipesServiceMock.getAmountOfRecipes.and.returnValue(helper.createRecipes(1));
      helper.recipesList[0].picture = undefined;
      component.ngOnInit();
      fixture.detectChanges();
      expect(domHelper.getAllOfElementsByTag('img').length).toBe(3);
    });
  });
});

class Helper {
  recipesList: Recipe[] = [];

  createRecipes(amount: number): Recipe[] {
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
