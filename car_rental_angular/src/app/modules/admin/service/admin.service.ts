import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { CarDto } from 'src/app/models/car.model';

const BASIC_URL = `http://localhost:8081`;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8081/api/admin'; // Cambia por tu URL de backend

  constructor(private http: HttpClient) {}

  postCar(formData: FormData) {
    const token = localStorage.getItem('token'); // O el método que uses para obtener el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = this.baseUrl + "/car";
    return this.http.post(`${url}`, formData, { headers });
  }
}
