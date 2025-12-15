import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  saveClicked: boolean = false;
  hasLettersAndNumbers: boolean = false;
  hasSpecialCharacter: boolean = false;
  hasMinLength: boolean = false;
  isMatched: boolean = false;
  email:string=''
  constructor(private authServices: AuthService, private router: Router,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.email=this.activatedRoute.snapshot.queryParams['email']
    localStorage.removeItem('token');
    localStorage.removeItem('otp');
    this.form = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required]),
    });
    let lettersAndNumbers = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    let SpecialCharacter = /(?=.*[@#$%^&*!])/;
    this.form.get('password')?.valueChanges.subscribe((data: any) => {
      this.hasLettersAndNumbers = lettersAndNumbers.test(data);
      this.hasSpecialCharacter = SpecialCharacter.test(data);
      this.hasMinLength = data.length >= 8;
    });
    this.form.get('newPassword')?.valueChanges.subscribe((data: any) => {
      if (this.form.get('password')?.value&&data) {
        this.isMatched = this.form.get('password')?.value === data;
      }
    })
  }

  resetPassword() {
    this.authServices
      .resetPassword({email:this.email,newPassword:this.form.value.newPassword})
      .subscribe((response: any) => {
        if (response.isSuccess) {
          this.router.navigate(['auth'])
        }
      });
  }
}
