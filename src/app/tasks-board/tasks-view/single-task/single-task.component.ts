import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Status, Task } from '../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditorComponent } from '../../../shared/task-editor/task-editor.component';

@Component({
  selector: 'app-single-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-task.component.html',
  styleUrl: './single-task.component.css'
})
export class SingleTaskComponent {
  @Input() data: Task = {
    id: 0,
    name: '',
    description: '',
    status: Status.TODO,
    assignee: '',
    creationDate: new Date().toLocaleDateString(),
    estimation: 0
  };
  protected tasksService = inject(TasksService);
  private dialog = inject(MatDialog)
  
  public edit() {
    const dialogRef = this.dialog.open(TaskEditorComponent);
    dialogRef.componentRef?.setInput('title', `Edit Task - id: ${this.data.id}`);
    dialogRef.componentRef?.setInput('mode', 'edit');
    dialogRef.componentRef?.instance.taskForm.patchValue({
      id: this.data.id,
      name: this.data.name,
      description: this.data.description,
      status: this.data.status,
      assignee: this.data.assignee,
      estimation: this.data.estimation
    })
    dialogRef.afterClosed().subscribe();
  }
}
