import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Status, Task } from '../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditorComponent } from '../../../shared/task-editor/task-editor.component';
import { DragItemService } from '../services/drag-item.service';


@Component({
  selector: 'app-single-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-task.component.html',
  styleUrl: './single-task.component.css'
})
export class SingleTaskComponent implements OnInit {
  @Input() data: Task = {
    id: 0,
    name: '',
    description: '',
    status: Status.TODO,
    assignee: '',
    creationDate: new Date().toLocaleDateString(),
    estimation: 0
  };
  private dialog = inject(MatDialog)
  private dragItemService = inject(DragItemService);

  public ngOnInit(): void {}

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

  public onDragStart(event: any): void {
    this.dragItemService.setDraggedTask(this.data);
  }
}
