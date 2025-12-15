import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BaseService } from 'src/app/Shared/Services/base.service';

@Injectable()
export class HttpRequestsInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const baseService = inject(BaseService);

    if (localStorage.getItem('token')) {
      authRequest = request.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
      });
    }
    return next.handle(authRequest).pipe(
      tap((response: any) => {        
        if (response?.body?.isSuccess === false) {
          baseService.showFaildMessageDailoge();
          baseService.setFailureMessage(response?.body?.errors[0].message);
        } else {
          baseService.hideFaildMessageDailoge();
        }
      }),
      catchError((error: any) => {
        console.log(error);
        if (error.status === 400) {          
          if (error.error.errors) {
            let err: any = Object.entries(error.error.errors);
  
            err.forEach((element: any) => {
              baseService.showFaildMessageDailoge();
              baseService.setFailureMessage(element[0] + ' :' + element[1][0]);
            });
          }
        } else {
          baseService.showFaildMessageDailoge();
          baseService.setFailureMessage(
            'يبدو أنه قد حدث خطأ ما، من فضلك أعد المحاولة مجددًا'
          );
        }
  
        return throwError(() => error);
      })
    );
  }
}
