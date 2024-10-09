import { CarDto } from 'src/app/models/car.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8081/api/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
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

  deleteCar(id: number): Observable<string> {
    const url = this.getUrl(`car/${id}`);
    return this.http.delete<string>(url, { headers: this.getHeaders() });
  }

}
