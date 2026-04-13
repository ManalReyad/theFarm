import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  saveClicked: boolean = false;
  errorMsg:string=''
  private secretKey = 'mySecretKlkjdfjkvk;lvzjosAL:SJKoikjj1012';
  constructor(private authServices: AuthService, private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('otp');
    this.form = new FormGroup({
      Username: new FormControl(null, [Validators.required,]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  login() {
    this.saveClicked = true;
    this.errorMsg = '';

    if (this.form.valid) {
      this.authServices.login(this.form.value).subscribe(
        (response: any) => {
            this.saveClicked = false;
          
            this.router.navigate(['/dialy-summary']);
            // تشفير role قبل التخزين
            if (response.userType) {
              const encryptedRole = CryptoJS.AES.encrypt(
                response.userType.toString(),
                this.secretKey
              ).toString();
              localStorage.setItem('role', encryptedRole);
            }

        },
        (error: any) => {
          this.errorMsg=error.error
        }
      );
    }
  }



  goToForgorPassword() {
    this.router.navigate(['auth/forget']);
  }
}
