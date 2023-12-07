import { Injectable } from '@angular/core';
import { FlatNode } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  private previousExpansionModel: FlatNode[] = [];

  constructor() { }

  getPrevExpansionModel(): FlatNode[] {
    return this.previousExpansionModel;
  }

  setPrevExpansionModel(expansionModel: FlatNode[]) {
    this.previousExpansionModel = expansionModel;
  }
}
