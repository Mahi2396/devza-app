import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { TaskService } from "../task/task.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorService } from 'src/app/shared/service/http-interceptor.service';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, HttpClientModule, UserRoutingModule],
  providers: [
    TaskService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
})
export class UserModule {}
