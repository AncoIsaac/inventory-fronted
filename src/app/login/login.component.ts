import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string = '';
  isloading: boolean = false;
  loginForm: FormGroup;


  constructor(
    private autSerivce: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required] ],
    });
  }
  onSubmit() {
    if (!this.loginForm.valid) {
      console.log('Formulario válido');
      
     this.loginForm.markAllAsTouched();
     return;
    }

    const { email, password } = this.loginForm.value;
    
    this.autSerivce.login({email, password}).subscribe({
      next: (res) => {
        console.log(res, 'res');
        this.isloading = true;
      },
      error: (err) => {
        console.log(err, 'err');
        
        this.isloading = false;
        this.errorMessage = err.error.message;
      },
    });
  }
}
