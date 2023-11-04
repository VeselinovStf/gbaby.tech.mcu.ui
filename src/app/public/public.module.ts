import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home-component';
import { AboutComponent } from './about/about-component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { LoginComponent } from './login/login.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TocComponent } from './toc/toc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
    TopNavigationComponent,
    LoginComponent,
    PrivacyComponent,
    TocComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    TopNavigationComponent
  ]
})
export class PublicModule { }
