import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { OperationMenuService } from './operation-menu.service';
import { Subscription } from 'rxjs';

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
export class OperationMenuComponent implements OnInit, OnDestroy {
  protected projectName: string = 'Default name';
  protected allUsers: string[] = [];
  protected filteredUser = '';
  private subs: Set<Subscription> = new Set();

  private modalService = inject(ModalService);
  private tasksViewService: TasksViewService = inject(TasksViewService);
  private authService: AuthService = inject(AuthService);
  private operationMenuService: OperationMenuService = inject(OperationMenuService);
  private currentLoggedUserName: string = '';

  @Output() filtered = new EventEmitter<string>();

  public ngOnInit(): void {
    this.subs.add(this.tasksViewService.getSelectedProjectName$().subscribe(
      selectedProjectName => this.projectName = selectedProjectName
    ));
    this.subs.add(this.authService.getCurrentLoggedInUsername$().subscribe(
      currentLoggedUserName => this.currentLoggedUserName = currentLoggedUserName
    ));
    this.subs.add(this.operationMenuService.getFilteredUserName$().subscribe(
      userName => this.filteredUser = userName
    ));
    this.allUsers = this.authService.getAllRegisteredUsers();
  }

  public ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  protected openTaskModalCreation(): void {
    const dialogRef = this.modalService.open('task', TaskEditorComponent);
    dialogRef.componentRef?.setInput('title', 'Create New Task');
    dialogRef.componentRef?.setInput('mode', 'create');
    dialogRef.afterClosed().subscribe();
  }

  protected handledTasksAssignedToMe(): void {
    this.filtered.emit(this.currentLoggedUserName);
    this.filteredUser = this.currentLoggedUserName;
    this.operationMenuService.setFiltereUserName(this.filteredUser);
  }

  protected handledFilterByAssignee(userName: string): void {
    this.filtered.emit(userName);
    this.filteredUser = userName;
    this.operationMenuService.setFiltereUserName(this.filteredUser);
  }

  protected removeFilter(): void {
    this.filteredUser = '';
    this.operationMenuService.setFiltereUserName(this.filteredUser);
    this.filtered.emit(this.filteredUser);
  }
}
