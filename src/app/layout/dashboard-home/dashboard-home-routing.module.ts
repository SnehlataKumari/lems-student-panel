import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardHomeComponent } from './dashboard-home.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const routes: Routes = [
  { path: 'dashboard',component: DashboardHomeComponent},
  { path: 'profile-view',component: ProfileViewComponent},
  { path: 'profile-edit',component: ProfileEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardHomeRoutingModule { }
