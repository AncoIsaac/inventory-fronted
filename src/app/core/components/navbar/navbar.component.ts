import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Bell, LogOut, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showNotifications = false;
  @ViewChild('notificationsDropdown') notificationsDropdown!: ElementRef;

  constructor(private router: Router) {}


  notifications = [
    { id: 1, text: 'Nuevo mensaje recibido', time: 'Hace 5 minutos' },
    { id: 2, text: 'Tarea completada', time: 'Hace 1 hora' },
    { id: 3, text: 'Recordatorio: Reunión a las 3 PM', time: 'Hace 2 horas' }
  ];
  bellIcon = Bell;
  logOutIcon = LogOut;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  handleLogout() {
    this.router.navigate(['/login']);
    
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.notificationsDropdown.nativeElement.contains(event.target)) {
      this.showNotifications = false;
    }
  }



 
}