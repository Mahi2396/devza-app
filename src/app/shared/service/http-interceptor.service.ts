import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "./../../../environments/environment";
import { LoaderService } from "../component/loader/loader.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken: string = environment.AUTH_KEY;
    if (accessToken) {
      request = request.clone({
        headers: request.headers.set("AuthToken", accessToken),
      });
    }
    this.loaderService.setHttpProgressStatus(true);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event["status"] === 200) {
          this.loaderService.setHttpProgressStatus(false);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.loaderService.setHttpProgressStatus(false);
        return throwError(error);
      })
    );
  }
}
