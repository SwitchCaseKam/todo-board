import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '../../tasks-board/services/tasks.service';
import { Status, Task } from '../../tasks-board/tasks-view/models/task.model';
import { ModalService } from '../../services/modal.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TasksViewService } from '../../tasks-board/services/tasks-view.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

enum TaskEditorMode {
  VIEW = 'view',
  CREATE = 'create',
  EDIT = 'edit'
}

@Component({
  selector: 'app-task-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.css'
})
export class TaskEditorComponent implements OnInit, OnDestroy{
  
  @Input() title: string = '';
  @Input() mode: TaskEditorMode = TaskEditorMode.CREATE;
  @Input() data: Task = {
    id: 0,
    name: '',
    description: '',
    status: Status.TODO,
    assignee: '',
    creationDate: '',
    estimation: 0
  };
  
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private taskService: TasksService = inject(TasksService);
  private tasksViewService: TasksViewService = inject(TasksViewService);
  private modalService: ModalService = inject(ModalService);
  private selectedProjectName: string = '';
  private selectedProjectNameSub = new Subscription();
  protected assignees: string[] = [];

  public taskForm = this.mode === TaskEditorMode.CREATE 
    ? this.formBuilder.group({
        id: 0,
        name: new FormControl(''),
        description: '',
        status: new FormControl<Status>(Status.TODO),
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
    this.selectedProjectNameSub = this.tasksViewService.getSelectedProjectName$().subscribe(
      selectedProjectName => this.selectedProjectName = selectedProjectName
    );
    this.assignees = this.authService.getAllRegisteredUsers();
  }

  public ngOnDestroy(): void {
    this.selectedProjectNameSub.unsubscribe();
  }

  public submitTask(): void {
    switch(this.mode) {
      case TaskEditorMode.CREATE:
        this.createTask();
        break;
      case TaskEditorMode.EDIT:
        this.updateTask();
        break;
      default:
        this.createTask();
    }
    this.modalService.close();
  }

  public cancel(event: Event): void {
    console.log(event)
    event.stopPropagation()
  }

  public removeTask(event: Event): void {
    this.taskService.deleteTask(this.selectedProjectName, this.data.id);
    event.preventDefault()

  }

  public editMode(): void {
    this.mode = TaskEditorMode.EDIT;
    this.taskForm.patchValue({
        id: this.data.id,
        name: this.data.name,
        description: this.data.description,
        status: this.data.status,
        assignee: this.data.assignee,
        estimation: this.data.estimation
    });
  }

  private createTask(): void {
    this.taskService.createTask(
      this.selectedProjectName,
      this.taskForm.value.name!,
      this.taskForm.value.description!,
      this.taskForm.value.assignee!,
      this.taskForm.value.estimation!
    );
  }

  private updateTask(): void {
    this.taskService.updateTask(
      this.selectedProjectName,
      this.taskForm.value.id!,
      this.taskForm.value.name!,
      this.taskForm.value.description!,
      this.taskForm.value.status!,
      this.taskForm.value.assignee!,
      this.taskForm.value.estimation
    );
  }

  // id: number,
  // name: string,
  // description: string,
  // status: Status,
  // assignee: string,
  // creationDate?: string,
  // estimation: number




  
}
