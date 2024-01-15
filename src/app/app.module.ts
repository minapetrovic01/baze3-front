import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AppState } from './app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { SignInUserComponent } from './sign-in-user/sign-in-user.component';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import{ MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import { authReducer } from './store/user.reducer';
import { UserEffects } from './store/user.effects';
import { CalculatorComponent } from './calculator/calculator.component';
import { DisplayPostComponent } from './display-post/display-post.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedPageComponent } from './feed-page/feed-page.component';
import { MyDecisionsComponent } from './my-decisions/my-decisions.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './interceptor';
import { NavComponent } from './nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { myDecisionsReducer, searchedDecisionsReducer } from './store/decisions.reducer';
import { DecisionsEffects } from './store/decisions.effects';
import {MatGridListModule} from '@angular/material/grid-list';
import {NgChartsModule} from 'ng2-charts';
import { BackgroundCanvasComponent } from './background-canvas/background-canvas.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInUserComponent,
    SignUpUserComponent,
    CalculatorComponent,
    DisplayPostComponent,
    ProfileComponent,
    FeedPageComponent,
    MyDecisionsComponent,
    HomePageComponent,
    NavComponent,
    BackgroundCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot<AppState>({auth:authReducer, myDecisions:myDecisionsReducer, searchedDecisions:searchedDecisionsReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([UserEffects,DecisionsEffects]),
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatSidenavModule,
    MatGridListModule,
    NgChartsModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: ['http://localhost:4200/auth/login']
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
