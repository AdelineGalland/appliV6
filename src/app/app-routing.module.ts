import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//rempalcer card par home/:idCategory/:idCard

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'home/:id', loadChildren: './category/category.module#CategoryPageModule' },
  { path: 'game/:id', loadChildren: './game/game.module#GamePageModule' },
  { path: 'card', loadChildren: './card/card.module#CardPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
