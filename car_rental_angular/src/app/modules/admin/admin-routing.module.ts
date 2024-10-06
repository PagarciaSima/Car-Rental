import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCarComponent } from './components/post-car/post-car.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { authGuard } from 'src/app/auth/guards/auth.guard';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: AdminDashboardComponent },
  { path: "car", component: PostCarComponent, canActivate: [authGuard], }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
