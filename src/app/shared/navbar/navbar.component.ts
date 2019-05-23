import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Recipe} from '../../recipes/shared/recipe';
import {RecipesService} from '../../recipes/shared/recipes.service';
import {Router} from '@angular/router';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  logInForm: FormGroup;
  searchForm: FormGroup;
  signUpForm: FormGroup;
  recipesToSearch: Recipe[];
  recipes: Recipe[];
  constructor(private modalService: NgbModal,
              private recipesService: RecipesService,
              private router: Router) {

    this.logInForm = new FormGroup({
      emailLogIn: new FormControl(''),
      passwordLogIn: new FormControl('')
    });
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
    this.signUpForm = new FormGroup({
      emailSignUp: new FormControl(''),
      passwordSignUp: new FormControl(''),
      passwordSignUpRepeat: new FormControl(''),
    });
  }

  ngOnInit() {
   this.getRecipesForSearch();
  }

  getRecipesForSearch(){
  this.recipesService.getRecipes().subscribe( list => {
    this.recipesToSearch = list;
  });
  }

  openLogInForm(logIn) {
    this.modalService.open(logIn);
  }
  openSignUpForm(signUp) {
    this.modalService.open(signUp);
  }

  tryLogIn() {

  }

  trySignUp() {

  }

  search($event: any) {
    if($event.target.value === '') {
      this.recipes = [];
    } else {
      this.recipes = this.recipesToSearch.filter(rec =>
        rec.name.toLowerCase().indexOf($event.target.value.toLowerCase()) === 0);
      console.log($event.target.value.toLowerCase());
    }
  }

  navigate() {

    this.recipes.filter(rec =>
      rec.name.toLowerCase().indexOf(this.searchForm.get('search').value.toLowerCase()) === 0);
    this.router.navigateByUrl('/recipes/' + this.recipes[0].id);
    console.log(this.recipesToSearch[0].id);
    this.searchForm.get('search').setValue('');
  }
}
