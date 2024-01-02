import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationMenuService {

  private filteredUserName: string = '';
  private filteredUserName$: BehaviorSubject<string> = new BehaviorSubject(this.filteredUserName);

  constructor() { }

  public getFilteredUserName$(): Observable<string> {
    return this.filteredUserName$.asObservable();
  }

  public setFiltereUserName(userName: string): void {
    this.filteredUserName = userName;
    this.filteredUserName$.next(this.filteredUserName);
  }
}
