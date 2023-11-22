import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { OperationMenuComponent } from './operation-menu/operation-menu.component';
import { TasksViewComponent } from './tasks-view/tasks-view.component';

@Component({
  selector: 'app-tasks-board',
  standalone: true,
  imports: [
    CommonModule,
    SideBarComponent,
    OperationMenuComponent,
    TasksViewComponent
  ],
  templateUrl: './tasks-board.component.html',
  styleUrl: './tasks-board.component.css'
})
export class TasksBoardComponent {

}
