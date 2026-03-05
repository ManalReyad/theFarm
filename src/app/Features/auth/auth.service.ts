import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl + 'Users/';
  private secretKey = 'mySecretKlkjdfjkvk;lvzjosAL:SJKoikjj1012';
  constructor(public http: HttpClient) {}

  login(body:any)
  {
    return this.http.post(this.baseUrl+`login`,body)
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

    // دالة لفك تشفير role عند الحاجة
    getDecodedRole(): string | null {
      const storedRole = localStorage.getItem('role');
      if (storedRole) {
        const bytes = CryptoJS.AES.decrypt(storedRole, this.secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
      }
      return null;
    }
}
