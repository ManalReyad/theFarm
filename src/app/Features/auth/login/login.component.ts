import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  saveClicked: boolean = false;
  errorMsg:string=''
  constructor(private authServices: AuthService, private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('otp');
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  login() {
    this.saveClicked = true;
    this.errorMsg=''
    if (this.form.valid) {
      this.authServices.login(this.form.value).subscribe((response: any) => {
        if (response.isSuccess) {
          this.saveClicked = false;
          localStorage.setItem('otp', JSON.stringify(response.data));
          this.router.navigate(['auth/verify']);
        }else
        {
          this.errorMsg='البريد الإلكتروني أو كلمة المرور غير صحيحة'
          
        }
      },
      (error:any)=>
      {
        console.log(error);
        
      }
    );
    }
  }

  goToForgorPassword() {
    this.router.navigate(['auth/forget']);
  }
}
