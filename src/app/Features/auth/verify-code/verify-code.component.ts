import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent implements OnInit {
  @ViewChild('ngOtpInput') ngOtpInputRef: any;
  loginData: any;
  otpControl: FormControl = new FormControl();
  otpForm!: FormGroup;
  otpData: any;
  errMsg: string = '';
  time: string = '01:00';
  loading: boolean = false;
  passwordForgetted: boolean = false;
  constructor(
    private authServices: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.passwordForgetted = this.activatedRoute.snapshot.queryParams['forget'];
    this.timer();
    let data = localStorage.getItem('otp');
    if (data !== null) {
      this.otpData = JSON.parse(data);
    } else {
      this.otpData = {};
    }
    this.otpForm = new FormGroup({
      otpControl: new FormControl(null, Validators.required),
    });
  }
  otpChanged(e: string) {
    this.otpForm.setValue({ otpControl: e });
  }
  verify() {
    this.loading = true;
    //code: this.otpForm.value.otpControl
    this.authServices
      .verifyCode({ code: this.otpData.code, email: this.otpData.email })
      .subscribe((response: any) => {
        this.loading = false;
        if (response.isSuccess) {
          localStorage.setItem('token', response.data.token);
          if (this.passwordForgetted) {
            this.router.navigate(['/reset']);
          } else {
            this.router.navigate(['/employees']);
          }
        } else {
          //this.errMsg = response?.errors[0]?.message;
        }
      });
  }
  resendCode()
  {
    
  }
  timer() {
     let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.time = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished');
        clearInterval(timer);
      }
    }, 1000);
  }
}
