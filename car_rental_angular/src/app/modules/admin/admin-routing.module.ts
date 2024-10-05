import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCardComponent } from './components/post-card/post-card.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: AdminDashboardComponent },
  { path: "car", component: PostCardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
