import { Injectable } from '@angular/core';
import { FlatNode } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  private tasksListExpansionModel: FlatNode[] = [];

  constructor() { }

  public setTasksListExpansionModel(tasksListExpansionModel: FlatNode[]): void {
    this.tasksListExpansionModel = tasksListExpansionModel;
  }

  public getTaskListExpansionModel(): FlatNode[] {
    return this.tasksListExpansionModel;
  }
}
