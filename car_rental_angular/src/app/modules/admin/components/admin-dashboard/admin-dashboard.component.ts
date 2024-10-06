import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CarDto } from 'src/app/models/car.model';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{

  cars: CarDto [] = [];

  constructor(private adminService: AdminService) {

  }

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe({
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
}
