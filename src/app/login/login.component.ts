import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  protected loginForm: FormGroup = this.formBuilder.group({
      loginName: new FormControl('', [Validators.required, this.validateUserName()]),
      password: new FormControl('', [Validators.required])
    }
  );

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  
  }

  public logIn(): void {
    this.authService.logIn(this.loginForm.value.loginName);
    this.router.navigate(['/home']);
  }

  protected logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/loxxxgin']);
  }

  private validateUserName(): ValidatorFn {
    return (control: AbstractControl) => {
      const userName = control.value;
      if (!this.authService.getAllRegisteredUsers().includes(userName)) {
        return { 'userDoesntExist': true };
      }
      return null;

    };
  }

}
