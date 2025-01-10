import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { User } from '../app.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIcon, FormsModule, ReactiveFormsModule, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  @Input() purpose: 'login' | 'signup';

  err: string | null;
  shown: 'password' | 'text' = 'password';

  loginform = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  signupform = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    telephone: new FormControl(''),
  })

  constructor(){
    this.purpose = 'login'
    this.err = null;
  }

  change(){
    if(this.shown == 'password') {
      this.shown = 'text';
    } else {
      this.shown = 'password';
    }
  }

  login(){
    //chiamata al login
     if(this.loginform.valid){
      let user = {
        email: this.loginform.value.email,
        password: this.loginform.value.password
      }
      console.log(user);
     }
    

  }

  signup(){
    if(this.signupform.valid){
        
      //post dell'user
     }
  }

  reset(){

  }

  close(){

  }

}
