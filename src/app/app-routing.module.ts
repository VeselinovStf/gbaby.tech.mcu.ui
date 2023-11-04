import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about-component';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { TocComponent } from './public/toc/toc.component';
import { PrivacyComponent } from './public/privacy/privacy.component';
import { CreateUserComponent } from './private/create-user/create-user.component';
// import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth-guard';
import { ControlComponent } from './private/control/control.component';
import { UpdateComponent } from './private/update/update.component';
// import { LogsComponent } from './private/logs/logs.component';
import { SettingsComponent } from './private/settings/settings.component';
import { SetupAccountComponent } from './private/setup-account/setup-account.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: 'home', loadChildren: () => import('./modules/home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'about', loadChildren: () => import('./modules/about-page/about-page.module').then(m => m.AboutPageModule) },
  // { path: 'about', component: AboutComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'privacy', component: PrivacyComponent },
  // { path: 'toc', component: TocComponent },
  // { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] },
  // { path: 'control', component: ControlComponent ,canActivate: [AuthGuard] },
  // { path: 'updates', component: UpdateComponent , canActivate: [AuthGuard] },
  // { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  // { path: 'setup-account', component: SetupAccountComponent, canActivate: [AuthGuard] },
  // { path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuard] },
  // { path: 'logs', component: LogsComponent }, //, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
