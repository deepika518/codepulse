import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private coookieService: CookieService){

  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Your authentication logic here
    if(this.shouldInterceptRequest(req)){
      const authRequest = req.clone({
        setHeaders: {
          'Authorization': this.coookieService.get('Authorization')
        }
      });

      return next.handle(authRequest);
    }

    return next.handle(req);

  }

  private shouldInterceptRequest(request: HttpRequest<any>): boolean{
    return request.urlWithParams.indexOf('addAuth=true', 0) >-1? true: false;
  }
}
