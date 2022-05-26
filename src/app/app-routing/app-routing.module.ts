import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthPageComponent} from "../components/auth-page/auth-page.component";
import {MainPageComponent} from "../main-page/main-page.component";
import {CreateCharacterComponent} from "../create-character/create-character.component";


const routers: Routes = [
  {path: 'auth', component: AuthPageComponent},
  {path: 'main', component: MainPageComponent},
  {path: 'create/:template', component: CreateCharacterComponent},
  {path: 'update/:template/:cid', component: CreateCharacterComponent},
  {path: '**', redirectTo: 'auth'},
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routers)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
