import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {AuthService, statuses} from "../../services/auth.service";
import {User} from "../../services/models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  hide=true;
  curState = states.login;
  states = states;

  login = new FormControl(null);//, Validators.required);
  name = new FormControl(null);//, this.registerNameValidator);
  password = new FormControl(null);//, Validators.required);
  confirmPassword = new FormControl(null);//, this.passwordValidator);

  status : statuses = statuses.Unauthorized;

  constructor(private readonly authService : AuthService,
              private readonly router : Router) { }

  group: FormGroup = new FormGroup({
    login : this.login,
    name : this.name,
    password: this.password,
    confirmPassword: this.confirmPassword
  })


  emptyCheck(control : AbstractControl) : boolean
  {
    return control === null || control === undefined || control.value === undefined || control.value === null;
  }

  registerNameValidator(control: AbstractControl) : {[s:string]:any}|null
  {
    if(control.disabled || !control.touched) {
      console.log("1");
        return {"name": false};
    }

    if(control === null || control === undefined || control.value === undefined || control.value === null) {
      console.log("2");
      return {"name": true};
    }
    console.log("3");

    return null;

  }

  passwordValidator(control : AbstractControl) : {[s:string]:any}|null
  {
    if(control.disabled || !control.touched) {
      return null;
    }
    if(control === null || control === undefined || control.value === undefined || control.value === null)
       return {"password": true};
    if(this.password.value != this.confirmPassword.value)
      return {"password": true, "confirmPassword" : true};
     // if(control.value !== this.password.value)
     //   return {"not same":true};

    return null;
  }

  ngOnInit(): void {
    this.authService.status.subscribe(
      value => {
        this.status = value;
        if(value == statuses.Authorized) {
            this.router.navigate(['/main']);
        }
      }
    )
  }

  onActionButtonClick() {
    if(this.curState == states.login) {
      let loginStr = this.login.value;
      let passwordStr = this.password.value;
      if(this.group.valid)
      this.authService.authUser(loginStr,passwordStr);
      else console.log("err");
    } else {
      let user: User = {
        login:this.login.value,
        password:this.password.value,
        name:this.name.value,
        character_count:0
      };
      if(this.group.valid)
      this.authService.requestRegister(user);
      else console.log("err");
    }

  }

  onSubmit() {

  }

  onChangeStateButtonClick() {
    if(this.curState == states.login) {
      this.curState = states.registration;
    } else {
      this.curState = states.login;
    }

  }

  isStringValid(str : string) {
    return str.length;
  }
}


enum states {
  login= "Войти",
  registration = "Регистрация"
}
