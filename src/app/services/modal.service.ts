import { ApplicationRef, ComponentRef, ElementRef, EnvironmentInjector, Injectable, Input, TemplateRef, Type, ViewContainerRef, createComponent, inject } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';
import { Options } from '../shared/modal/modal-options';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

interface Modal {
  id: string,
  component: ComponentType<any>
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: Modal[] = [];
  private matDialog: MatDialog = inject(MatDialog);

  constructor() {}

  public open(id: string, component: ComponentType<any>) : MatDialogRef<any, any> {
    this.modals.push({id, component});
    return this.matDialog.open(component);
  }

  public close(): void {
    this.matDialog.closeAll()
  }

}
