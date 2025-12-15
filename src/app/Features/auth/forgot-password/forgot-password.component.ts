import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  saveClicked: boolean = false;
  errMsg: string = '';
  loading: boolean = false;
  success: boolean = false;
  constructor(private authServices: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  sendCode() {
    this.errMsg = '';
    this.success = false;
    this.loading = true;
    this.authServices
      .forgetPassword(this.form.value)
      .subscribe((response: any) => {
        this.loading = false;
        if (response.isSuccess) {
          this.success = true;
        } else {
          this.errMsg = response?.errors[0]?.message;
        }
      });
  }
}
