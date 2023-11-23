import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditorComponent } from '../../shared/task-editor/task-editor.component';

@Component({
  selector: 'app-operation-menu',
  standalone: true,
  imports: [
    CommonModule,
    TaskEditorComponent
  ],
  templateUrl: './operation-menu.component.html',
  styleUrl: './operation-menu.component.css'
})
export class OperationMenuComponent {
  protected projectName: string = 'Default name';

  private dialog = inject(MatDialog)

  public openTaskModalCreation(): void {
    const dialogRef = this.dialog.open(TaskEditorComponent);
    dialogRef.componentRef?.setInput('title', 'Create New Task');
    dialogRef.componentRef?.setInput('mode', 'create');
    dialogRef.afterClosed().subscribe();
  }
}
