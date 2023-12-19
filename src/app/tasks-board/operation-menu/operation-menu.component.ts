import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { AuthService } from '../../services/auth.service';

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
  private authService: AuthService = inject(AuthService);
  private currentLoggedUserName: string = '';
  protected allUsers: string[] = [];
  protected filteredUser = '';

  @Output() filtered = new EventEmitter<string>();

  public openTaskModalCreation(): void {
    const dialogRef = this.modalService.open('task', TaskEditorComponent);
    dialogRef.componentRef?.setInput('title', 'Create New Task');
    dialogRef.componentRef?.setInput('mode', 'create');
    dialogRef.afterClosed().subscribe();
  }

  public ngOnInit(): void {
    this.tasksViewService.getSelectedProjectName$().subscribe(
      selectedProjectName => this.projectName = selectedProjectName
    );

    this.allUsers = this.authService.getAllRegisteredUsers();

    this.authService.getCurrentLoggedInUsername$().subscribe(
      currentLoggedUserName => this.currentLoggedUserName = currentLoggedUserName
    );
  }

  public handledTasksAssignedToMe(): void {
    this.filtered.emit(this.currentLoggedUserName);
    this.filteredUser = this.currentLoggedUserName;
  }

  public handledFilterByAssignee(userName: string): void {
    this.filtered.emit(userName);
    this.filteredUser = userName;
  }

  public sortByPriority(): void {
  }

  public sortByEffort(asc: boolean = true): void {

  }

  protected removeFilter(): void {
    this.filteredUser = '';
    this.filtered.emit('');
  }
}
