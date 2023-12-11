import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logInFlag: boolean = false;
  private logInFlag$: BehaviorSubject<boolean> = new BehaviorSubject(this.logInFlag);

  private currentLoggedInUsername: string = '';
  private currentLoggedInUsername$: BehaviorSubject<string> = new BehaviorSubject(this.currentLoggedInUsername);

  private allRegisteredUsers: string[] = ['kamil', 'bob', 'alice', 'john', 'michael'];

  constructor() { }

  public logIn(userName: string): void {
    this.logInFlag = true;
    this.currentLoggedInUsername = userName;
    this.logInFlag$.next(this.logInFlag);
    this.currentLoggedInUsername$.next(this.currentLoggedInUsername);
  }

  public logOut(): void {
    this.logInFlag = false;
    this.currentLoggedInUsername = '';
    this.logInFlag$.next(this.logInFlag);
    this.currentLoggedInUsername$.next(this.currentLoggedInUsername);
  }

  public getLogInFlag$(): Observable<boolean> {
    return this.logInFlag$.asObservable();
  }

  public getCurrentLoggedInUsername$(): Observable<string> {
    return this.currentLoggedInUsername$.asObservable();
  }

  public getAllRegisteredUsers(): string[] {
    return this.allRegisteredUsers;
  }
}
