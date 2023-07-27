import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'daily-recommendations', loadChildren: () => import('./views/daily-recommendations/daily-recommendations.module').then(m => m.DailyRecommendationsModule) },
  { path: 'home', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
  { path: 'my-matches', loadChildren: () => import('./views/my-matches/my-matches.module').then(m => m.MyMatchesModule) },
  { path: 'profile', loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
