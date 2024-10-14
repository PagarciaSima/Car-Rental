import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { CarDto } from 'src/app/models/car.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent implements OnInit, OnDestroy {

  isSpinning = false;
  carId: number = 0;
  existingImage: string | null = null;
  paramsSubscription: Subscription = new Subscription();
  updateForm!: FormGroup;
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfOption: Array<{label:string, value:string}> = [];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.updateForm = this.fb.group ({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    });

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
    this.isSpinning = true;
    this.adminService.getCarById(this.carId).subscribe({
      next: (res) => {
        this.isSpinning = false;
        const carDto = JSON.stringify(res, null, 2);
        this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
        console.log("carDTO " + carDto);
        this.updateForm.patchValue(res);
      },
      error: (error) => {
        console.error('Error al obtener el coche:', error);
      }
    });
  }
}
