import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkMenuItemRadio, CdkMenuItemCheckbox, CdkMenuGroup,
  CdkMenu, CdkMenuTrigger, CdkMenuItem, CdkMenuBar,
} from '@angular/cdk/menu';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-group-header',
  standalone: true,
  imports: [
    CommonModule,
    CdkMenuBar,
    CdkMenuItem,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuGroup,
    CdkMenuItemCheckbox,
    CdkMenuItemRadio
  ],
  templateUrl: './group-header.component.html',
  styleUrl: './group-header.component.css'
})
export class GroupHeaderComponent {
  @Input() name: string = '';
  @Input() tasks: Task[] = [];

}
