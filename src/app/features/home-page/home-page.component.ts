import { Component } from '@angular/core';
import { SidebarComponent } from '../../core/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
