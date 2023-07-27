import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyMatchesRoutingModule } from './my-matches-routing.module';
import { MyMatchesComponent } from './my-matches.component';


@NgModule({
  declarations: [
    MyMatchesComponent
  ],
  imports: [
    CommonModule,
    MyMatchesRoutingModule
  ]
})
export class MyMatchesModule { }
