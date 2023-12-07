import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { TaskEditorComponent } from '../../shared/task-editor/task-editor.component';
import { ModalService } from '../../services/modal.service';
import {DialogModule} from '@angular/cdk/dialog';
import {
  CdkMenuItemRadio, CdkMenuItemCheckbox, CdkMenuGroup,
  CdkMenu, CdkMenuTrigger, CdkMenuItem, CdkMenuBar,
} from '@angular/cdk/menu';
import { TasksViewService } from '../services/tasks-view.service';
import { MatButton, MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-operation-menu',
  standalone: true,
  imports: [
    CommonModule,
    TaskEditorComponent,
    DialogModule,
    CdkMenuBar,
    CdkMenuItem,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuGroup,
    CdkMenuItemCheckbox,
    CdkMenuItemRadio,
    MatButtonModule
  ],
  templateUrl: './operation-menu.component.html',
  styleUrl: './operation-menu.component.css'
})
export class OperationMenuComponent implements OnInit {
  protected projectName: string = 'Default name';
  private modalService = inject(ModalService);
  private tasksViewService: TasksViewService = inject(TasksViewService);

  public openTaskModalCreation(): void {
    const dialogRef = this.modalService.open('task', TaskEditorComponent);
    dialogRef.componentRef?.setInput('title', 'Create New Task');
    dialogRef.componentRef?.setInput('mode', 'create');
    dialogRef.afterClosed().subscribe();
  }

  public ngOnInit(): void {
    this.tasksViewService.getSelectedProjectName$().subscribe(
      selectedProjectName => this.projectName = selectedProjectName
    )
  }

  public handledTasksAssignedToMe(): void {

  }

  public handledFilterByAssignee(): void {

  }

  public sortByPriority(): void {
  }

  public sortByEffort(asc: boolean = true): void {

  }
}
