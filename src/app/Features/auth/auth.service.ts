import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl + 'Account/';
  constructor(public http: HttpClient) {}

  login(body:any)
  {
    return this.http.post(this.baseUrl+`Login`,body)
  }
  verifyCode(body:any)
  {
    return this.http.post(this.baseUrl+`VerifyCode`,body)
  }
  forgetPassword(body:any)
  {
    return this.http.post(this.baseUrl+`ForgotPassword`,body)
  }
  resetPassword(body:any)
  {
    return this.http.post(this.baseUrl+`ResetPassword`,body)
  }
  changePassword(body:any)
  {
    return this.http.post(this.baseUrl+`ChangePassword`,body)
  }
  isAuthenticatedUser(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
