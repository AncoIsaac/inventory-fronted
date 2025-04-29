import { Component, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../core/components/table/table.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserPagination } from './interface/IPaginationUser';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users = signal<UserPagination[]>([]);
  loading = signal(false);
  currentPage = signal(1);
  totalItems = signal(0);
  totalPages = signal(0);

  columns = [
    { field: 'userName', header: 'Nombre' },
    { field: 'email', header: 'Correo' },
    { field: 'role', header: 'Role' },
    {
      field: 'isActive',
      header: 'Estado',
      format: (value: boolean) => (value ? 'Activo' : 'Inactivo'),
    },
  ];

  pageSize: number = 10;
  protected Math = Math;
  searchControl = new FormControl('');
  private cachedData: Map<string, any> = new Map();
  private cacheTimeout: number = 5 * 60 * 1000;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
    this.setupSearch();
  }

  setupSearch() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.currentPage.set(1);
        this.clearCache();
        this.loadUsers();
      });
  }

  private getCacheKey(): string {
    return `users_${this.currentPage()}_${this.pageSize}_${
      this.searchControl.value || ''
    }`;
  }

  private getCachedData(key: string): any | null {
    const cached = this.cachedData.get(key);
    if (!cached) return null;

    const now = new Date().getTime();
    if (now - cached.timestamp > this.cacheTimeout) {
      this.cachedData.delete(key);
      return null;
    }

    return cached.data;
  }

  private setCachedData(key: string, data: any) {
    this.cachedData.set(key, {
      data,
      timestamp: new Date().getTime(),
    });

    if (this.cachedData.size > 10) {
      const oldestKey = Array.from(this.cachedData.keys())[0];
      this.cachedData.delete(oldestKey);
    }
  }

  loadUsers(forceRefresh: boolean = false) {
    if (this.loading()) return;

    const cacheKey = this.getCacheKey();
    const cachedResponse = forceRefresh ? null : this.getCachedData(cacheKey);

    if (cachedResponse) {
      this.updateUserData(cachedResponse);
      return;
    }

    this.loading.set(true);
    const params = {
      page: this.currentPage(),
      size: this.pageSize,
      search: this.searchControl.value || '',
    };

    this.userService.getUsers(params).subscribe({
      next: (response) => {
        if (forceRefresh) {
          this.clearCache();
        }
        this.setCachedData(cacheKey, response);
        this.updateUserData(response);
      },
      error: (error) => {
        console.error('Error cargando usuarios:', error);
        this.loading.set(false);
      },
    });
  }

  private updateUserData(response: any) {
    this.users.set(response.data);
    this.totalItems.set(response.totalItems);
    this.totalPages.set(response.totalPages);
    this.currentPage.set(response.currentPage);
    this.loading.set(false);
  }

  private clearCache() {
    this.cachedData.clear();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadUsers(false); // No forzar actualización en cambio de página
  }

  refreshData() {
    this.loadUsers(true); // Forzar actualización cuando se presiona el botón
  }

  handleEdit(user: any) {
    console.log('Editar usuario:', user);
    this.clearCache(); // Notificar cambios después de editar
  }

  handleDelete(user: any) {
    console.log('Eliminar usuario:', user);
    this.clearCache(); // Notificar cambios después de eliminar
  }
}
