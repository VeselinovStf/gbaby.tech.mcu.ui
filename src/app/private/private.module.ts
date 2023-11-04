import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { ControlComponent } from './control/control.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { LogsComponent } from './logs/logs.component';
import { SettingsComponent } from './settings/settings.component';
import { UpdateComponent } from './update/update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { SetupAccountComponent } from './setup-account/setup-account.component';

@NgModule({
    declarations: [
        // SideNavigationComponent,
        ControlComponent,
        DashboardComponent,
        // LogsComponent,
        CreateUserComponent,
        SettingsComponent,
        UpdateComponent,
        SetupAccountComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        // SideNavigationComponent,
        DashboardComponent
    ]
})
export class PrivateModule { }
