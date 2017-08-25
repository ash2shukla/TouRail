import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import {Validation} from './validation';
import { AppComponent } from './app.component';
import { VirtualtourComponent } from './virtualtour/virtualtour.component';
import { StationService } from './station.service';
import {Services} from './services';
import { VirtualtourhiComponent } from './virtualtourhi/virtualtourhi.component';
@NgModule({
  declarations: [
    AppComponent,
    VirtualtourComponent,
    VirtualtourhiComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      {
        path:'tour',
        component:VirtualtourComponent
      },
      {
        path:'',
        pathMatch:'full',
        redirectTo:'/tour'
      },
      {
        path:'tour/hi',
        component:VirtualtourhiComponent
      }
    ]),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [StationService,AppComponent,Validation,Services],
  bootstrap: [AppComponent]
})
export class AppModule { }
