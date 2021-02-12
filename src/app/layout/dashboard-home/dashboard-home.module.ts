import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavModule } from '../nav/nav.module';
import { MatModuleModule } from '../../mat-module.module';

import { DashboardHomeRoutingModule } from './dashboard-home-routing.module';
import { DashboardHomeComponent } from './dashboard-home.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [DashboardHomeComponent, ProfileViewComponent, ProfileEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardHomeRoutingModule,
    NavModule,
    MatModuleModule,
    MatSelectModule ,
    MatFormFieldModule
  ]
})
export class DashboardHomeModule { }
