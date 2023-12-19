import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  protected userName: Observable<string> = of('');
  private authService: AuthService = inject(AuthService);


  public ngOnInit(): void {
    this.userName = this.authService.getCurrentLoggedInUsername$();
  }

  public ngOnDestroy(): void {
    
  }

}
