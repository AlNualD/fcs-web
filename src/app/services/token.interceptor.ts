import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";



@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request : HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {

    if(this.auth.token!= null){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.token}`
        }
      });
    }
    return next.handle(request);
  }
}
