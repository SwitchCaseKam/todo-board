import { Component, OnInit, inject } from '@angular/core';
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
  protected logInFlag: boolean = false;
  protected currentLoggedInUsername: string = '';

  public ngOnInit(): void {
    this.authService.getLogInFlag$().pipe(
      tap((logInFlag: boolean) => this.logInFlag = logInFlag),
      switchMap(() => this.authService.getCurrentLoggedInUsername$())
    ).subscribe(
      (userName: string) => this.currentLoggedInUsername = userName
    );
  }

  protected logOut(): void {
    this.authService.logOut();
  }
}
