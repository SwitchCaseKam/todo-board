import { AfterViewChecked, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTree, MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TasksService } from '../services/tasks.service';
import { FlatNode, TaskNode } from '../models/project.model';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { TaskSelectService } from '../services/task-select.service';

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
export class SideBarComponent implements OnInit, OnDestroy, AfterViewChecked {
  
  @ViewChild('tasksTree') tree!: MatTree<any, TaskNode[]>;

  private tasksService: TasksService = inject(TasksService);
  private taskSelectService: TaskSelectService = inject(TaskSelectService);
  private prevExpansionModel: FlatNode[] = [];

  public ngOnInit(): void {
    this.tasksService.getProjectTree$().subscribe(d => {
      this.prevExpansionModel = this.treeControl.expansionModel.selected;
      this.dataSource.data = d
    });
  }

  public ngOnDestroy(): void {
    console.log('destroy')
  }

  public ngAfterViewChecked(): void {
    this.prevExpansionModel.forEach(n => {
      this.treeControl.dataNodes.forEach(d => {
        if (n.name === d.name) { this.treeControl.expand(d); }
      });
    });
  }


  private _transformer = (node: TaskNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;

  public taskSelected(node: FlatNode) {
    this.taskSelectService.setCurrentSelectedTaskId(
      Number(node.name.split(' ')[0].replace('[', '').replace(']', ''))
    );
  }
}
