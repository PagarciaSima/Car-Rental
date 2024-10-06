import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '../../../models/auth.model';

const BASE_URL = "http://localhost:8081";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(signupRequest: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${BASE_URL}/api/auth/signup`, signupRequest);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${BASE_URL}/api/auth/login`, loginRequest);
  }
}
