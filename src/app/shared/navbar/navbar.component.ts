import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  logInForm: FormGroup;
  searchForm: FormGroup;
  signUpForm: FormGroup;
  constructor(private modalService: NgbModal) {

    this.logInForm = new FormGroup({
      emailLogIn: new FormControl(''),
      passwordLogIn: new FormControl(''),
    });
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
    this.signUpForm = new FormGroup({
      emailSignUp: new FormControl(''),
      passwordSignUp: new FormControl(''),
    });
  }

  ngOnInit() {
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
}
