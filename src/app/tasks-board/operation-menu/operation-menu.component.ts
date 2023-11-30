import { Component, Type, createComponent } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskEditorComponent } from '../../shared/task-editor/task-editor.component';
import { ModalService } from '../../services/modal.service';
import { Dialog, DialogConfig } from '@angular/cdk/dialog';
import {DialogModule} from '@angular/cdk/dialog';

interface Modal {
  id: string;
  visible: boolean;
}

@Component({
  selector: 'app-operation-menu',
  standalone: true,
  imports: [
    CommonModule,
    TaskEditorComponent,
    DialogModule
  ],
  templateUrl: './operation-menu.component.html',
  styleUrl: './operation-menu.component.css'
})
export class OperationMenuComponent {
  protected projectName: string = 'Default name';
  private modalService = inject(ModalService);

  public openTaskModalCreation(): void {
    const dialogRef = this.modalService.open('task', TaskEditorComponent);
    dialogRef.componentRef?.setInput('title', 'Create New Task');
    dialogRef.componentRef?.setInput('mode', 'create');
    dialogRef.afterClosed().subscribe();
  }

  abc() {
    console.log('cab')
  }
}
