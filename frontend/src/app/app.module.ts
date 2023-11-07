import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeapicomponentComponent } from './homeapicomponent/homeapicomponent.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
//import{DatalistService } from './datalist.service'

@NgModule({
  declarations: [
    AppComponent,
    HomeapicomponentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
    //DatalistService
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
