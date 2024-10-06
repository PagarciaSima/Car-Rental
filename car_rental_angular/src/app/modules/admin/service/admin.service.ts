import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { CarDto } from 'src/app/models/car.model';

const BASE_URL = 'http://localhost:8081/api/admin'; // Cambia por tu URL de backend

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // O el método que uses para obtener el token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  private getUrl(endpoint: string): string {
    return `${BASE_URL}/${endpoint}`;
  }

  postCar(formData: FormData): Observable<any> { 
    const url = this.getUrl('car');
    return this.http.post(url, formData, { headers: this.getHeaders() });
  }

  getAllCars(): Observable<CarDto[]> {
    const url = this.getUrl('cars');
    return this.http.get<CarDto[]>(url, { headers: this.getHeaders() });
  }
}
