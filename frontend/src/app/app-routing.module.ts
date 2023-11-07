import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeapicomponentComponent } from './homeapicomponent/homeapicomponent.component';


const routes: Routes = [
{path : '', component:HomeapicomponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }