import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoggedInService } from './services/logged-in.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoggedInService],
    loadChildren: () => import('./shared/shared.module').then(mod => mod.SharedModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./layout/dashboard-home/dashboard-home.module').then(mod => mod.DashboardHomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
