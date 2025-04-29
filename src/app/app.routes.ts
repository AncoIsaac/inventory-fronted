import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/shared/guard/auth.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ), children: [
        {
          path: '',
          loadComponent: () =>
            import('./features/dashboard/dashboard.component').then(
              (m) => m.DashboardComponent
            ),
        },
      ],
    canActivate: [authGuard],
  },
];
