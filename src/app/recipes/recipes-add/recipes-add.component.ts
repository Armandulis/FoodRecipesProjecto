import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Recipe} from '../shared/recipe';
import {FormControl, FormGroup, FormArray} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipesService} from '../shared/recipes.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {FileMetaData} from '../../files/shared/file-metadata';
import {ImageMetadata} from '../../files/shared/image-metadata';

@Component({
  selector: 'app-recipes-add',
  templateUrl: './recipes-add.component.html',
  styleUrls: ['./recipes-add.component.scss']
})
export class RecipesAddComponent implements OnInit {

    recipeFormGroup: FormGroup;
    ingredientsFormArray: FormArray;

  imageMetadata: ImageMetadata;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;

  isLoading = false;

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
    this.isLoading = true;
    const recipeData: Recipe = this.recipeFormGroup.value;
    this.recipesService.addRecipeWithImage(recipeData, this.imageMetadata).subscribe( () => {
      this.router.navigate(['../'],
        {relativeTo: this.activatedRoute});
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
    });
  }

  private setUpFileInfo() {
    if (this.imageChangedEvent &&
      this.imageChangedEvent.target &&
      this.imageChangedEvent.target.files &&
      this.imageChangedEvent.target.files.length > 0) {
      const imageBeforeCropped = this.imageChangedEvent.target.files[0];

      this.imageMetadata = {
        imageBlob: this.croppedBlob,
        fileMeta: {
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
