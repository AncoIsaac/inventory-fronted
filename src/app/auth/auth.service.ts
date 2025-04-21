import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ILogin } from '../../interface/login/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http:localhost:3000';
  private isAuthenticated: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  login(data: ILogin) {
    return this.http.post(`${this.apiUrl}/login`, { email: data.email, password: data.password }).pipe(
      tap((response) => {
        console.log(response);
        this.isAuthenticated = true;
        this.router.navigate(['/dashboard']);
      })
    );
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('token');
  }
}
