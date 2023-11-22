import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleTaskComponent } from '../single-task/single-task.component';
import { Task, Status } from '../models/task.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    SingleTaskComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  
  @Input() title: string = 'In Progress';
  @Input() tasks: Task[] = [];

  public ngOnInit(): void {
  }
}
