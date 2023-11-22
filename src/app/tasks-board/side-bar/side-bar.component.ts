import { AfterViewChecked, Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTree, MatTreeFlatDataSource, MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TasksService } from '../services/tasks.service';
import { TaskNode } from '../models/project.model';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit, AfterViewChecked {
  
  @ViewChild('tasksTree') tree!: MatTree<any, any>;

  private tasksService: TasksService = inject(TasksService);
  treeControl = new NestedTreeControl<TaskNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TaskNode>();

  public ngOnInit(): void {
    console.log('SideBarComponent onInit2')
    // this.tasksService.createProjectTree();
    this.tasksService.getProjectTree$().subscribe(d => {
      this.dataSource.data = d
      console.log('getProjectTree', this.dataSource.data)
    });

  }

  
  public ngAfterViewChecked(): void {
    this.tree.renderNodeChanges(this.dataSource.data)
    // this.renderer2.setStyle(this.housingLocationComponent.nativeElement, 'background-color', 'pink');
  }

  hasChild = (_: number, node: TaskNode) => !!node.children && node.children.length > 0;
}
