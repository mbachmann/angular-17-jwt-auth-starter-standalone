import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { httpInterceptorProviders } from './app/core/_shared/_helpers/http.interceptor';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import {CountryService} from "./app/demo/service/country.service";
import {CustomerService} from "./app/demo/service/customer.service";
import {EventService} from "./app/demo/service/event.service";
import {IconService} from "./app/demo/service/icon.service";
import {NodeService} from "./app/demo/service/node.service";
import {PhotoService} from "./app/demo/service/photo.service";
import {ProductService} from "./app/demo/service/product.service";

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule),
        httpInterceptorProviders,
        provideHttpClient(withInterceptorsFromDi()),
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
    ]
})
  .catch(err => console.error(err));
