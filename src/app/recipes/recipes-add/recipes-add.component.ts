import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Recipe} from '../shared/recipe';
import {FormControl, FormGroup, FormArray} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipesService} from '../shared/recipes.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';

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

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private recipesService: RecipesService) {

    this.ingredientsFormArray = new FormArray([this.createRecipe()]);

    this.recipeFormGroup = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      portion: new FormControl(''),
      howTo: new FormControl(''),
      ingredients: this.ingredientsFormArray,
      cookTime: new FormControl('')
    });

  }

  ngOnInit() {
  }

  addRecipe(){
    const recipeData: Recipe = this.recipeFormGroup.value;
    console.log('pressed ze button');
    this.recipesService.addRecipe(recipeData).subscribe( () => {
      console.log('it has been added!');
    });
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
