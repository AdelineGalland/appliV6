import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//rempalcer card par home/:idCategory/:idCard

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'category/:id', loadChildren: './category/category.module#CategoryPageModule' },
  { path: 'game/:idCategory', loadChildren: './game/game.module#GamePageModule' },
  { path: 'card/:idCategory/:idCard', loadChildren: './card/card.module#CardPageModule' },
  { path: 'new-category', loadChildren: './new-category/new-category.module#NewCategoryPageModule' },
  { path: 'new-card/:idCategory', loadChildren: './new-card/new-card.module#NewCardPageModule' },
  { path: 'edit-category/:id', loadChildren: './edit-category/edit-category.module#EditCategoryPageModule' },
  { path: 'edit-card', loadChildren: './edit-card/edit-card.module#EditCardPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
