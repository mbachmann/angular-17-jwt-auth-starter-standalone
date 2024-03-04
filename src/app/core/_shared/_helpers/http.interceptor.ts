import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../_event/event-bus.service';
import { EventData } from '../_event/event.class';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private storageService: StorageService, private eventBusService: EventBusService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    });

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if ( !req.url.includes('auth/signin') &&
            error.status === 401) {
            return this.handle401Error(req, next);
          }
        } else if (error?.error?.message) {
          // this.messageService.error(error?.error?.message, error);
          console.log(error?.error?.message);
        } else {
          switch (error.status) {
            case 0:
              console.log(`No connection to the backend.`)
              //this.messageService.error(
                //$localize`No connection to the backend.`,
                //error
              //);
              break;
            case 401:
              console.log(`The current session is not valid anymore. Please close the browser window and start the App again.`)
              //this.messageService.error(
              //  $localize`The current session is not valid anymore. Please close the browser window and start the App again.`,
              //  error
              //);
              break;
            case 404:
              console.log(`The object ${error.error.message} has not been found or is inactive.`)

              //this.messageService.error(
              //  $localize`The object ${error.error.message} has not been found or is inactive.`,
              //  error
              //);
              break;
            default:
              console.log(error.message, error);
              //this.messageService.error(error.message, error);
          }
        }
        this.createErrorMessage(error);
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.storageService.isLoggedIn()) {
        this.eventBusService.emit(new EventData('logout', null));
      }
    }

    return next.handle(request);
  }

  createErrorMessage(error) {
    if (error && error.message && error.error.message) {
      console.log("Backend no Response")
      if (error.error.message.toLowerCase().startsWith("Bad credentials")) {
        error.error.message = "User name and/or password not valid";
      } else {
        error.message = error.error.message;
      }

    } else {
      console.log("Backend no Response")
      if (error.message && error.message.toLowerCase().startsWith("http failure response")) {
        error.message = "No reponse from server! Do you have an internet connection?";
      }
    }
  }
}



export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
