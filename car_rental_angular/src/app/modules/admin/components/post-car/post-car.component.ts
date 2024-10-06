import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent implements OnInit {
  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfOption: Array<{label:string, value:string}> = [];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postCarForm = this.formBuilder.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    });
  }

  postCar(): void {
    console.log(this.postCarForm.value);
    this.isSpinning = true;

    const formData: FormData = new FormData();

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    const carDto = JSON.stringify(this.postCarForm.value);
    formData.append('car', new Blob([carDto], { type: 'application/json' }));

    console.log(formData);
    this.adminService.postCar(formData).subscribe({
      next: (res) => {
        this.message.success("Car posted successfully", { nzDuration: 5000 });
        console.log(res);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.message.error("Error while posting car", { nzDuration: 5000 });
        console.log(err);
      },
      complete: () => {
        this.isSpinning = false;
      }
    });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.previewImage();
    }
  }

  previewImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile!);
  }
}
