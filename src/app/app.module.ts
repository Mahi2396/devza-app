import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TopBarComponent } from "./shared/component/top-bar/top-bar.component";
import { SideNavComponent } from "./shared/component/side-nav/side-nav.component";
import { HttpInterceptorService } from "./shared/service/http-interceptor.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoaderComponent } from './shared/component/loader/loader.component';
import { LoaderService } from './shared/component/loader/loader.service';

@NgModule({
  declarations: [AppComponent, TopBarComponent, SideNavComponent, LoaderComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [
    HttpClientModule,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
