import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { HomeComponent } from '../modules/home-page/home/home-component';
// import { AboutComponent } from '../modules/about-page/about/about-component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TopNavigationComponent } from '../components/top-navigation/top-navigation.component';
// import { LoginComponent } from '../components/login/login.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TocComponent } from './toc/toc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePageModule } from '../modules/home-page/home-page.module';
import { AboutPageModule } from '../modules/about-page/about-page.module';

@NgModule({
  declarations: [
    // HomeComponent,
    // AboutComponent,
    PageNotFoundComponent,
   // TopNavigationComponent,
  //  LoginComponent,
    PrivacyComponent,
    TocComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
  //  TopNavigationComponent
  ]
})
export class PublicModule { }
