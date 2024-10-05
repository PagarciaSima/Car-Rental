import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NgZorroImportsModule } from 'src/app/NgZorroImportsModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCardComponent } from './components/post-card/post-card.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    PostCardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroImportsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
