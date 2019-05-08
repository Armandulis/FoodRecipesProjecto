import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Recipe} from '../shared/recipe';
import {FormControl, FormGroup, FormArray, Validators, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipesService} from '../shared/recipes.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {AddRecipe} from '../../shared/app.actions';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-recipes-add',
  templateUrl: './recipes-add.component.html',
  styleUrls: ['./recipes-add.component.scss']
})
export class RecipesAddComponent implements OnInit {

    inputs = 0;
    recipeFormGroup: FormGroup;
    ingredientsFormGroup: FormGroup;
    ingredientsFormArray: FormArray;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;

  angForm: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store,
              private fb: FormBuilder,
              private recipesService: RecipesService) {

    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      portion: ['', Validators.required ],
      howTo: ['', Validators.required ],
      type: ['', Validators.required ],
      cookTime: ['', Validators.required ],
      ingredients: ['', Validators.required ]
    });
  }

  ngOnInit() {
  }

  addRecipe() {
    this.store.dispatch(new AddRecipe({ name, type, portion, howTo, ingredients, cookTime}));
  }


  addIngrediantForm() {
    this.ingredientsFormArray = this.recipeFormGroup.get('ingredients') as FormArray;
    this.ingredientsFormArray.push(this.createRecipe());
  }


  private createRecipe(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      amount: new FormControl(''),
      picture: new FormControl(this.croppedImage)
    });
  }

  private setUpFileInfo() {
    if (this.imageChangedEvent &&
      this.imageChangedEvent.target &&
      this.imageChangedEvent.target.files &&
      this.imageChangedEvent.target.files.length > 0) {
      const imageBeforeCropped = this.imageChangedEvent.target.files[0];

      const imageInfoForDB =  {
        imageBlob: this.croppedBlob,
        file: {
          name: imageBeforeCropped.name,
          type: imageBeforeCropped.type,
          size: imageBeforeCropped.size
        }
      };

    }
  }

  uploadImage(event) {
    this.imageChangedEvent = event;
    this.setUpFileInfo();

  }

  imageCropped(event: ImageCroppedEvent) {
    // preview
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
    this.setUpFileInfo();
  }
}
