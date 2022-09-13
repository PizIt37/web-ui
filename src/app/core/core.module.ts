import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';
import { authInterceptor } from './services/auth/auth.interceptor.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
  ],
  providers: [
    AuthService,
   // authInterceptor
  ],
  imports: [
    HttpClientModule,
    CommonModule
  ]
})
export class CoreModule { }
