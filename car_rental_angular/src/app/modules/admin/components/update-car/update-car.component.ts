import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent implements OnInit, OnDestroy {

  carId: number = 0;
  private paramsSubscription: Subscription = new Subscription();

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params.subscribe(params => {
      this.carId = +params['id'];
    });
    this.getByCarById();
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  getByCarById() {
    this.adminService.getCarById(this.carId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.error('Error al obtener el coche:', error);
      }
    });
  }
}
