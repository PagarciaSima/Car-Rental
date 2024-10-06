import { Injectable } from '@angular/core';
import { User } from '../../../models/user.model';
import { jwtDecode } from "jwt-decode";

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token:string): void {
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);
  }

  static saveUser(user:User): void {
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  static getUser(): User | null {
    const userData = localStorage.getItem(USER);
    return userData ? JSON.parse(userData) : null;
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user && user.role ? user.role : '';
  }

  static isAdminLoggedIn(): boolean {
    if(this.getToken() == null) return false;
    const role:string = this.getUserRole();
    return role == 'ADMIN' ? true: false;
  }

  static isCustomerLoggedIn(): boolean {
    if(this.getToken() == null) return false;
    const role:string = this.getUserRole();
    return role == 'CUSTOMER' ? true: false;
  }

  static logout(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
  }

  static isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const decoded: any = jwtDecode(token); // Decodifica el token
    return decoded.exp * 1000 < Date.now(); // Verifica si ha expirado
  }
}
