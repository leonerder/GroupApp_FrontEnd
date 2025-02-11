import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { User } from '../app.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { ApiService } from '../services/api/api.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIcon, FormsModule, ReactiveFormsModule, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault],
  animations: [
    trigger('openLogin',[
          transition(':enter',[
            style({transform: 'translateY(300%)'}),
            animate('0.3s ease', style({transform: 'translateY(0%)'}))
          ]),
          transition(':leave',[
            style({transform: 'translateY(0%)'}),
            animate('0.3s ease', style({transform: 'translateY(300%)'})) //not working right
          ])
        ]),
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  
  open = false;
  state: 'visibility' | 'visibility_off' = 'visibility';

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

  constructor(private apiService: ApiService){
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
        mail: this.loginform.value.email,
        password: this.loginform.value.password
      }
      console.log(user);
      let info = this.apiService.access(user);
      info.subscribe((values: any) => {
        localStorage.setItem('token', values.token);
        console.log('salvo token')
        window.location.reload();
        
      });
     }
    

  }

  signup(){
    if(this.signupform.valid){

      let user =  {
        email: this.signupform.value.email,
        password: this.signupform.value.password,
        name: this.signupform.value.name,
        birthdate: this.signupform.value.date,
        lastname: this.signupform.value.surname,
        telephone: this.signupform.value.telephone
      };
      console.log(user);
      let info = this.apiService.register(user);
      info.subscribe((values: any) => {
        localStorage.setItem('token', values.token);
        console.log('salvo token')
        window.location.reload();
        
      });
      
     }
  }

  reset(){

  }

  close(){
    this.open = false;
  }

}
