import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageModule } from './modules/home-page/home-page.module';
import { AboutPageModule } from './modules/about-page/about-page.module';
//import { LoginComponent } from './components/login/login.component';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
import { SideNavigationComponent } from './private/side-navigation/side-navigation.component';
import { PrivateModule } from './private/private.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    //LoginComponent,
    TopNavigationComponent,
    SideNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomePageModule,
    AboutPageModule,
    PrivateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
}
