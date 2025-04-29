import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ISignIn } from './interface/ISignIn';
import { IApiRes } from './interface/IApiRes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private isAuthenticated: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  login(data: ISignIn) {
    return this.http
      .post<IApiRes>(`${this.apiUrl}/auth/signIn`, {
        email: data.email,
        password: data.password,
      })
      .pipe(
        tap((response: IApiRes) => {
          console.log(response);
          
          localStorage.setItem('token', response.data.token);
          this.isAuthenticated = true;
          this.router.navigate(['/hola']);
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
