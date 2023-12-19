import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FlatNode } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class TaskSelectService {

  private currentSelectedTaskId: number|undefined = undefined;
  private currentSelectedTaskId$: BehaviorSubject<number|undefined > = 
    new BehaviorSubject<number|undefined>(this.currentSelectedTaskId);


  constructor() { }

  public setCurrentSelectedTaskId(id: number): void {
    this.currentSelectedTaskId = id;
    this.currentSelectedTaskId$.next(this.currentSelectedTaskId);
  }

  public getCurrentSelectedTaskId(): Observable<number|undefined> {
    return this.currentSelectedTaskId$.asObservable();
  }

  public resetSelectedTask(): void {
    this.currentSelectedTaskId = undefined;
    this.currentSelectedTaskId$.next(this.currentSelectedTaskId);
  }
}
