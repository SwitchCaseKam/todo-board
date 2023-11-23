import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '../../tasks-board/services/tasks.service';
import { MatDialogClose } from '@angular/material/dialog';
import { Status, Task } from '../../tasks-board/tasks-view/models/task.model';

enum TaskEditorMode {
  CREATE = 'create',
  EDIT = 'edit'
}

@Component({
  selector: 'app-task-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogClose,
  ],
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.css'
})
export class TaskEditorComponent implements OnInit, OnDestroy{
  
  @Input() title: string = '';
  @Input() mode: TaskEditorMode = TaskEditorMode.CREATE;
  
  private formBuilder: FormBuilder = inject(FormBuilder);
  private taskService: TasksService = inject(TasksService);

  public taskForm = this.mode === TaskEditorMode.CREATE 
    ? this.formBuilder.group({
        id: 0,
        name: new FormControl(''),
        description: '',
        assignee: new FormControl(''),
        estimation: new FormControl()
      })
    :
    this.formBuilder.group({
      id: 0,
      name: new FormControl(''),
      description: '',
      status: new FormControl<Status>(Status.TODO),
      assignee: new FormControl(''),
      estimation: new FormControl()
    });

  public ngOnInit(): void {
    
  }

  public ngOnDestroy(): void {
    
  }

  public createTask(): void {
    console.log(this.taskForm.value)
    this.taskService.createTask(
      this.taskForm.value.name!,
      this.taskForm.value.description!,
      this.taskForm.value.assignee!,
      this.taskForm.value.estimation!
    );
  }

  public updateTask(): void {
    console.log(this.taskForm.value)
    this.taskService.updateTask(
      this.taskForm.value.id!,
      this.taskForm.value.name!,
      this.taskForm.value.description!,
      Status.TODO,
      this.taskForm.value.assignee!,
      this.taskForm.value.estimation
    );
  }
  
}
