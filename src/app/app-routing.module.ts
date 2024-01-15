import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInUserComponent } from './sign-in-user/sign-in-user.component';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';
import { FeedPageComponent } from './feed-page/feed-page.component';
import { ProfileComponent } from './profile/profile.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MyDecisionsComponent } from './my-decisions/my-decisions.component';
import { IsAuthGuard } from './auth/guard';

const routes: Routes = [
  {
    path:'', redirectTo: 'sign-in', pathMatch: 'full'
  },
  {
    path:'sign-in', component: SignInUserComponent, pathMatch: 'full'
  },
  {
    path:'sign-up', component: SignUpUserComponent, pathMatch: 'full'
  },
  {
    path:'feed', component: FeedPageComponent, pathMatch: 'full', canActivate: [IsAuthGuard]
  },
  {
    path:'my-profile', component: ProfileComponent, pathMatch: 'full', canActivate: [IsAuthGuard]
  },
  {
    path: 'calculator',	component:CalculatorComponent, pathMatch: 'full'
  },
  {
    path:'home-page', component:HomePageComponent, pathMatch: 'full', canActivate: [IsAuthGuard]
  },
  {
    path:'my-decisions', component:MyDecisionsComponent, pathMatch: 'full', canActivate: [IsAuthGuard]
  },
  {
    path:'**', redirectTo: 'sign-in', pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
