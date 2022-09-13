import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './components/main/main.component';
import { CoreModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
