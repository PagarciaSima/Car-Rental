import { AdminService } from '../../service/admin.service';
import { CarDto } from 'src/app/models/car.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy{

  cars: CarDto [] = [];
  private carsSubscription: Subscription = new Subscription;

  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ) {

  }

  ngOnInit(): void {
    this.getAllCars();
  }

  ngOnDestroy(): void {
    if (this.carsSubscription) {
      this.carsSubscription.unsubscribe();
    }
  }

  getAllCars() {
    this.cars = [];
    this.carsSubscription = this.adminService.getAllCars().subscribe({
      next: (res) => {
        console.log(res);
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage; // Nota la coma aquí
          this.cars.push(element);
        })
      }, error: (err) => {
        console.log("error", err);
      }
    })
  }

  deleteCar(id: number) {
    console.log("ID", id);
    this.adminService.deleteCar(id).subscribe({
      next: () => {
        this.cars = this.cars.filter(car => car.id !== id);
        this.message.success("Car deleted successfully", { nzDuration: 5000 });
      },
      error: (err) => {
        console.error("Error deleting car:", err);
        this.message.error("Error deleting car", { nzDuration: 5000 });
      },
      complete: () => {
        console.log("Delete car process complete.");
      }
    });
  }

}
