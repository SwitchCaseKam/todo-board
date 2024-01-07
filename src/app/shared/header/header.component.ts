import { AfterViewChecked, Component, OnChanges, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { tap, switchMap} from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  private authService: AuthService = inject(AuthService);
  protected isLoggedIn: boolean = false;
  protected currentLoggedInUsername: string = '';

  public ngOnInit(): void {
    this.authService.getLogInFlag$().pipe(
      tap((logInFlag: boolean) => this.isLoggedIn = logInFlag),
      switchMap(() => this.authService.getCurrentLoggedInUsername$())
    ).subscribe(
      (userName: string) => {
        console.log('currentLoggedInUsername: ', userName);
        this.currentLoggedInUsername = userName;
      }
    );
    this.handleHamburgerMenu();
  }

  protected logOut(): void {
    this.authService.logOut();
  }


  private handleHamburgerMenu(): void {
    const hamburgerMenuButton = document.querySelector('.hamburger-menu');
    const menuItems = document.querySelector('.options');
    console.log('hamburgerMenuButton: ', hamburgerMenuButton, ' menuItems: ', menuItems);
    if (hamburgerMenuButton && menuItems) {
      console.log('csdfvdfg')
      hamburgerMenuButton.addEventListener('click', () => {
        console.log('hamburger menu clicked')
        menuItems.classList.toggle('active');
      });
      menuItems.addEventListener('click', () => {
        console.log('menu items')
        menuItems.classList.toggle('active');
      });
    }
  }
}
